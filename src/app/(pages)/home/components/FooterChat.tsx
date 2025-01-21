import { DynamicIcon } from "@/components/DynamicIcon";
import { useChatStore } from "@/hooks/chat.hook";
import React, { useEffect, useRef, useState } from "react";
import ModalTemplates from "./ModalTemplates";
import { useForm } from "react-hook-form";
import {
  createLog,
  getMessagesById,
  sendMessage,
  validateFromNumber,
  validateCountMessages,
  uploadFiles,
} from "@/api/goHighLevel/messages.api";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const ToasDisplayLoader = () => {
  const { contactsSelected, messagesSent, setContactsSelected } = useChatStore();

  useEffect(() => {
  }, [messagesSent]);

  return (
    <div className="flex items-center gap-2 w-full h-full">
      <h1 className="font-bold">
        Mensajes enviados ({messagesSent.length}/{contactsSelected.length})
      </h1>
    </div>
  );
};

export default function FooterChat() {
  const {
    setOnModalTemplate,
    templateSelected,
    setTemplateSelected,
    contactsSelected,
    messageType,
    fromNumber,
    setMessagesSent,
    setContactsSelected,
    setFromNumber,
  } = useChatStore();

  const { handleSubmit, register, setValue, watch, reset } = useForm();
  const message = watch("message");
  const textareaRef = useRef<any>(null);
  const [cursorPosition, setCursorPosition] = useState<any>(null);
  const [load, setLoad] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleOpenTemplate = () => {
    setOnModalTemplate(true);
  };

  const getFromNumber = async () => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("Token no encontrado en las cookies");
      return "+18557256650";
    }

    const decodedToken: any = jwtDecode(token);
    const email = decodedToken?.userEmail;

    if (!email) {
      console.error("Correo no encontrado en el token");
      return "+18557256650";
    }

    const resp = await validateFromNumber(email);

    let data = '';

    if (resp.data) {
      data = resp.data;
    } else {
      data = '+18557256650';
    }

    setFromNumber(data);
    return data;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const allowedFormats = [
      "jpg", "jpeg", "png", "mp4", "mpeg", "zip", "rar", "pdf", "doc", "docx", "txt",
    ];
    const newAttachments = [...attachments];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const extension = file.name.split(".").pop()?.toLowerCase();

      if (!allowedFormats.includes(extension!)) {
        toast.error(`El archivo "${file.name}" no tiene un formato válido.`);
        continue;
      }

      if (newAttachments.length >= 5) {
        toast.error("No puedes adjuntar más de 5 archivos.");
        break;
      }

      try {
        const response = await uploadFiles(file);
        newAttachments.push(response.data);
        toast.success(`Archivo "${file.name}" cargado exitosamente.`);
      } catch (error) {
        console.error(error);
        toast.error(`Error al cargar el archivo "${file.name}".`);
      }
    }

    setAttachments([...newAttachments]);
    event.target.value = "";
  };

  const handleRemoveAttachment = (index: number) => {
    const updatedAttachments = [...attachments];
    updatedAttachments.splice(index, 1);
    setAttachments(updatedAttachments);
  };

  const handleSendMessage = async (data: any) => {
    await validateCountMessages(contactsSelected.length).then(async (resp) => {
      if (resp.canSend) {
        if (!load) {
          setLoad(true);
          toast.loading(<ToasDisplayLoader />);

          const sentMessages = [];

          for (const contact of contactsSelected) {
            const body: ISendMessageBody = {
              type: messageType.value === "TYPE_WHATSAPP" ? "WhatsApp" : "SMS",
              contactId: contact.contactId,
              appointmentId: "APPOINTMENT_ID",
              message: data.message,
              // message: messageType.value === "TYPE_WHATSAPP" ? "" : data.message,
              subject: "Sample Subject",
              scheduledTimestamp: Math.floor(new Date().getTime() / 1000),
              fromNumber: await getFromNumber(),
              // fromNumber2: fromNumber,
              toNumber: contact.phone!,
              // templateId: messageType.value === "TYPE_WHATSAPP" ? templateSelected?.idTemplate : null,
              attachments
            };

            console.log('body => ', body);

            try {
              const resp = await sendMessage(body);
              await createLog({
                toNumber: body.toNumber,
                messageContent: body.message,
              });

              sentMessages.push(resp.messageId);
              setMessagesSent((prev) => [...prev, resp.messageId]);
            } catch (err) {
              console.log(err);
            }
          }

          setMessagesSent(sentMessages);
          // setContactsSelected([]);

          toast.dismiss();
          toast.success(
            `(${sentMessages.length}/${contactsSelected.length}) mensajes enviados exitosamente`,
            {
              onClose: () => {
                setMessagesSent([]);
              },
            }
          );

          setTemplateSelected(null);
          setLoad(false);
          setAttachments([])
          reset();
        }
      } else {
        toast.error(resp.message);
      }
    });
  };

  const handleCursorChange = () => {
    if (textareaRef.current) {
      setCursorPosition({
        start: textareaRef.current.selectionStart,
        end: textareaRef.current.selectionEnd,
      });
    }
  };

  useEffect(() => {
    if (templateSelected) {
      const { start, end } = cursorPosition;
      const currentText = message || "";

      const newText =
        currentText.substring(0, start) +
        templateSelected.description +
        currentText.substring(end);

      setValue("message", newText);
      //setTemplateSelected(null);
    }
  }, [templateSelected]);

  useEffect(() => {
    textareaRef.current?.focus();

    handleCursorChange();
  }, []);

  useEffect(() => {
    textareaRef.current?.focus();
    setValue("message", "");
  }, [messageType]);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleSubmit(handleSendMessage)();
    }
  };
  const handleClearMessage = () => {
    setValue("message", "");
    textareaRef.current?.focus();
  };

  return (
    <>
      <div className="footerChat flex flex-col gap-2 p-4 bg-slate-100 rounded">
        <form
          className="flex w-full justify-between items-center gap-4"
          onSubmit={handleSubmit(handleSendMessage)}
        >
          <button
            type="button"
            className="btn btn-sm bg-indigo-500 text-white"
            onClick={handleOpenTemplate}
          >
            <DynamicIcon
              icon="mingcute:paper-fill"
              className="text-lg text-white"
            />
          </button>
          <textarea
            className="textareaChat flex-grow p-2 border border-gray-300 rounded"
            placeholder={
              messageType.value === "TYPE_WHATSAPP"
                ? "Escoje una plantilla de WhatsApp"
                : "Escribe un mensaje"
            }
            {...register("message", { required: true })}
            ref={(e) => {
              register("message").ref(e);
              textareaRef.current = e;
            }}
            onSelect={handleCursorChange}
            onClick={handleCursorChange}
            onKeyUp={handleCursorChange}
            onKeyDown={handleKeyDown}
            style={{ maxHeight: "150px", overflowY: "auto" }}
            readOnly={messageType.value === "TYPE_WHATSAPP"}
          />
          <label className="btn btn-sm bg-gray-500 text-white cursor-pointer">
            <DynamicIcon
              icon="material-symbols:attach-file"
              className="text-lg text-white"
            />
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.mp4,.mpeg,.zip,.rar,.pdf,.doc,.docx,.txt"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <button
            type="submit"
            className="flex gap-4 items-center"
            disabled={load}
            title="Enviar"
          >
            <DynamicIcon
              icon="fa-solid:paper-plane"
              className="text-lg text-gray-500"
            />
          </button>
        </form>
        {attachments.length > 0 && (
          <div className="attachments-list flex flex-wrap items-center gap-4 mt-2 p-2 bg-gray-100 rounded border border-gray-300">
            {attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex items-center bg-white border border-gray-300 p-2 rounded-lg shadow-sm"
                style={{ maxWidth: "150px" }}
              >
                <DynamicIcon icon="material-symbols:insert-drive-file" className="text-indigo-500 mr-2" />
                <span
                  className="text-sm text-gray-700 truncate"
                  title={attachment}
                  style={{ maxWidth: "90px" }}
                >
                  {attachment}
                </span>
                <button
                  onClick={() => handleRemoveAttachment(index)}
                  className="ml-2 p-1 hover:bg-red-100 rounded-full"
                  title="Eliminar archivo"
                >
                  <DynamicIcon icon="material-symbols:delete" className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <ModalTemplates />
    </>
  );

}

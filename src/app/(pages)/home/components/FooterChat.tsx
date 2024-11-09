import { DynamicIcon } from "@/components/DynamicIcon";
import { useChatStore } from "@/hooks/chat.hook";
import React, { useEffect, useRef, useState } from "react";
import ModalTemplates from "./ModalTemplates";
import { useForm } from "react-hook-form";
import {
  createLog,
  getMessagesById,
  sendMessage,
  validateCountMessages,
} from "@/api/goHighLevel/messages.api";
import { toast } from "react-toastify";

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
    setContactsSelected
  } = useChatStore();

  const { handleSubmit, register, setValue, watch, reset } = useForm();
  const message = watch("message");
  const textareaRef = useRef<any>(null);
  const [cursorPosition, setCursorPosition] = useState<any>(null);
  const [load, setLoad] = useState(false);

  const handleOpenTemplate = () => {
    setOnModalTemplate(true);
  };

  const handleSendMessage = async (data: any) => {
    await validateCountMessages(contactsSelected.length).then(async (resp) => {
      if (resp.canSend) {
        if (!load) {
          setLoad(true);
          toast.loading(<ToasDisplayLoader />);

          const sentMessages = []; // Array temporal para acumular los mensajes enviados

          for (const contact of contactsSelected) {
            const body: ISendMessageBody = {
              type: messageType.value === "TYPE_WHATSAPP" ? "WhatsApp" : "SMS",
              contactId: contact.contactId,
              appointmentId: "APPOINTMENT_ID",
              message: data.message,
              // message: messageType.value === "TYPE_WHATSAPP" ? "" : data.message,
              subject: "Sample Subject",
              scheduledTimestamp: Math.floor(new Date().getTime() / 1000),
              fromNumber: fromNumber,
              toNumber: contact.phone!,
              // templateId: messageType.value === "TYPE_WHATSAPP" ? templateSelected?.idTemplate : null,
            };

            try {
              const resp = await sendMessage(body);
              await createLog({
                toNumber: body.toNumber,
                messageContent: body.message,
              });

              sentMessages.push(resp.messageId); // Agrega cada messageId al array temporal
              setMessagesSent((prev) => [...prev, resp.messageId]); // Actualiza el estado con todos los mensajes enviados
            } catch (err) {
              console.log(err);
            }
          }

          setMessagesSent(sentMessages); // Actualiza el estado con todos los mensajes enviados
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
      console.log(templateSelected);
      //setTemplateSelected(null); // Resetea el template seleccionado
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
      <div className="footerChat">
        <form
          className="flex w-full justify-between items-center p-4 rounded bg-slate-100 gap-4"
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
            className="textareaChat"
            placeholder={
              messageType.value === "TYPE_WHATSAPP"
                ? "Escoje una plantilla de WhatsApp"
                : "Escribe un mensaje"
            }
            {...register("message", { required: true })}
            ref={(e) => {
              register("message").ref(e);
              textareaRef.current = e; // Asigna la referencia manualmente
            }}
            onSelect={handleCursorChange}
            onClick={handleCursorChange}
            onKeyUp={handleCursorChange}
            onKeyDown={handleKeyDown} // Envía el mensaje con Enter
            style={{ maxHeight: "150px", overflowY: "auto" }}
            readOnly={messageType.value === "TYPE_WHATSAPP"}
          />
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
          <button
            type="button"
            className="flex gap-4 items-center"
            disabled={load}
            onClick={handleClearMessage}
            title="Borrar"
            style={{
              display: messageType.value === "TYPE_WHATSAPP" ? "flex" : "none",
            }}
          >
            <DynamicIcon
              icon="material-symbols:delete"
              className="text-lg text-gray-500"
            />
          </button>
        </form>
      </div>
      <ModalTemplates />
    </>
  );
}

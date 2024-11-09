import { useChatStore } from '@/hooks/chat.hook'
import { useEffect, useState } from 'react'
import Select, { StylesConfig, SingleValue } from 'react-select';

export default function HeaderChat() {
    const { contactsSelected, messageType, setMessageType, setFromNumber } = useChatStore();
    const [options, setOptions] = useState<{ value: any, label: string }[]>([])
    const [optionsNumbers, setoptionsNumbers] = useState<{ value: string, label: string }[]>([]);
    const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null);

    const handleSelectType = (value: any) => {
        setMessageType(value)
    }

    const selectNumberFrom = (selectedOption: { value: string; label: string } | null) => {
        if (selectedOption) setFromNumber(selectedOption.value);
    };

    useEffect(() => {
        setOptions([
            { value: "TYPE_SMS", label: "SMS" },
            // { value: "TYPE_WHATSAPP", label: "WhatsApp" },
        ])
    }, [])

    useEffect(() => {
        const numbers = [
            { value: "+18448997259", label: "+1 844-899-7259" },
            { value: "+18557256650", label: "+1 855-725-6650" },
            { value: "+14073056022", label: "+1 407-305-6022" },
            { value: "+14079798514", label: "+1 407-979-8514" },
            { value: "+18447144600", label: "+1 844-714-4600" },
            { value: "+16892206599", label: "+1 689-220-6599" },
            { value: "+14076642646", label: "+1 407-664-2646" },
            { value: "+14076362141", label: "+1 407-636-2141" },
            { value: "+14075432596", label: "+1 407-543-2596" },
            { value: "+14078097370", label: "+1 407-809-7370" },
            { value: "+14075655871", label: "+1 407-565-5871" },
            { value: "+18448996966", label: "+1 844-899-6966" },
            { value: "+14075888953", label: "+1 407-588-8953" },
            { value: "+14072891471", label: "+1 407-289-1471" },
            { value: "+18447417819", label: "+1 844-741-7819" },
            { value: "+14078051680", label: "+1 407-805-1680" },
            { value: "+16892201370", label: "+1 689-220-1370" },
            { value: "+14073057344", label: "+1 407-305-7344" },
            { value: "+14076122629", label: "+1 407-612-2629" },
            { value: "+16892202672", label: "+1 689-220-2672" },
            { value: "+14079173179", label: "+1 407-917-3179" },
            { value: "+18889870214", label: "+1 888-987-0214" },
            { value: "+14073781601", label: "+1 407-378-1601" },
            { value: "+14079743405", label: "+1 407-974-3405" },
            { value: "+13212042919", label: "+1 321-204-2919" },
            { value: "+14079014364", label: "+1 407-901-4364" },
            { value: "+14079744629", label: "+1 407-974-4629" },
            { value: "+14072890920", label: "+1 407-289-0920" },
            { value: "+14076342082", label: "+1 407-634-2082" },
            { value: "+14079173875", label: "+1 407-917-3875" },
            { value: "+16892196228", label: "+1 689-219-6228" },
            { value: "+16892207590", label: "+1 689-220-7590" },
            { value: "+16892203887", label: "+1 689-220-3887" },
            { value: "+14077437649", label: "+1 407-743-7649" }
        ];

        setoptionsNumbers(numbers);
        setSelectedOption(numbers[1]);
    }, []);

    const stylesSelect: StylesConfig<{ value: string; label: string }> = {
        control: (styles) => ({ ...styles, borderRadius: '0.5rem', fontSize: '0.875rem', alignContent: 'center' }),
    }
    return (
        <div className='header py-2 px-4'>
            <div className="flex justify-between items-center w-full h-full">
                <h1 className='font-bold text-lg'>
                    Contactos seleccionados ({contactsSelected.length})
                </h1>
                <div className="flex items-center space-x-3">
                    <label>From:</label>
                    <Select<{ value: string; label: string }>
                        value={selectedOption}
                        className='w-[200px]'
                        onChange={(option: SingleValue<{ value: string; label: string }>) => {
                            setSelectedOption(option);
                            selectNumberFrom(option);
                        }}
                        options={optionsNumbers}
                        styles={stylesSelect}
                    />
                </div>
                {/* <Select
                    defaultValue={messageType}
                    className='w-[200px]'
                    onChange={handleSelectType}
                    options={options}
                    styles={stylesSelect}
                /> */}
            </div>
        </div>
    );
}

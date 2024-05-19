import { useRef, useState } from "react";

export default function useBoolean(initialValue) {
    const [value, setValue] = useState(initialValue);

    const updateValue = useRef({
        toggle: () => setValue(oldValue => !oldValue),
        on: () => setValue(true),
        true: () => setValue(true),
        off: () => setValue(false),
        false: () => setValue(false),
        value: (value) => setValue(value)
    })

    return [value, updateValue.current];
}
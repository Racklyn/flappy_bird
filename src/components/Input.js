import styled from "styled-components";

function Input({label, password, onChange, readOnly}) {
    return (
        <InputContainer>
            <label>{label}</label>
            <input
                readOnly={readOnly}
                type={password ? 'password' : 'text'}
                onChange={v => onChange(v)}
            />
        </InputContainer>
    )
}

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 30px;
    margin: 15px 0;
    width: 300px;

    input {
        font-size: 24px;
        padding: 8px;
        border-radius: 4px;
        border: none;
        margin-top: 6px;
        background-color: #EDE8FF;
    }
`

export default Input;
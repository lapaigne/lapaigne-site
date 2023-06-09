const MyCheckbox = ({ text, checked, onClick }) => {
    const id = `checkbox-${Math.round(Math.random() * 1e6)}`;

    return (
        <>
            <input
                id={id}
                defaultChecked={checked}
                type="checkbox"
                onClick={(event) => onClick(event.target.checked)}
            />
            <label htmlFor={id}>{text}</label>
        </>
    );
}
export default MyCheckbox;
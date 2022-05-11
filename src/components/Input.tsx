export const Input = (props: any) => {
  return (
    <>
      {props.type !== 'submit' && (
        <input
          {...props.register}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
        />
      )}
      {props.type === 'submit' && (
        <input type={props.type} value={props.value} />
      )}
    </>
  );
};

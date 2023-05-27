const Button = ({ type, children, style }) => {
  return (
    <button type={type} style={style}>
      {children}
    </button>
  );
};

export default Button;

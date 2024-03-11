function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className="">
      {children}
    </button>
  );
}

export default Button;

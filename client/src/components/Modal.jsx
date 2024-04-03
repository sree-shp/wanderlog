function Modal({ children }) {
  return (
    <div className="w-screen h-screen fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/20 ">
      <div className="w-[75%] bg-[#f8eedf] min-h-[150px] rounded-md flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default Modal;

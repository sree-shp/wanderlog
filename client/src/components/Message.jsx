function Message({ message }) {
  return (
    <p className=" text-white mx-5 text-center">
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;

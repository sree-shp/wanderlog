function CountryItem({ country }) {
  return (
    <li className="mx-5 w-[75px] h-[75px] bg-[#f1dcbf] rounded-md flex justify-center items-center">
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;

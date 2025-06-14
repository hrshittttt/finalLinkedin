import Header from "../Main/Header.jsx";
import Left from "./Left.jsx";
import Right from "./Right.jsx";

export default function JobHome() {
  return (
    <>
      <Header />
      <div className="flex flex-row gap-5">
        <Left />
        <Right />
      </div>
    </>
  );
}

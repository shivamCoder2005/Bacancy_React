import React from "react";

type User = {
  name: string;
  age: number;
};

interface Props {
  data: User[];
}

const MyList = React.memo(({ data }: Props) => {
  console.log("rendering the mylist componenet");
  return (
    <>
      {data.map((el, index) => (
        <div key={index}>
          <p>{el.name}</p>
          <p>{el.age}</p>
        </div>
      ))}
    </>
  );
});

export default MyList;

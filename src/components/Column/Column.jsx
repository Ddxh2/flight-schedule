import React from "react";

import "./Column.css";

const Column = ({ title, children }) => {
  return (
    <section className='column__container'>
      <h3 className='column__title'>{title}</h3>
      <div className='column__body'>{children}</div>
    </section>
  );
};

export default Column;

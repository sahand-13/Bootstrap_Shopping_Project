import React, { forwardRef } from "react";
import { Helmet } from "react-helmet-async";

const Title = forwardRef(({ title, children, meta, ...other }, ref) => (
  <>
    <Helmet>
      <title>{`${title} | KING`}</title>
      {meta}
    </Helmet>
    <div ref={ref} {...other}>
      {children}
    </div>
  </>
));

export default Title;

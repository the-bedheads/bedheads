import React, { FC } from 'react';

const Success: FC = (): JSX.Element => (
  <div className="success-container">
    <h1>You have successfully registered!</h1>
    <a href="/">Login here.</a>
  </div>
);
export default Success;

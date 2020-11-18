import React from "react";

export interface FullScreenLayoutProps {
  children: React.ReactChildren;
}

const FullScreenLayout: React.FC<FullScreenLayoutProps> = (props) => {
  return <>{props.children}</>;
};

export default FullScreenLayout;
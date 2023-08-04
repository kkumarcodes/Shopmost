import React from "react";

class SessionCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>
  }
}

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  //   const store = makeStore();
  return (
    <SessionCheck>
      {element}
    </SessionCheck>
  );
};

// @flow

type IGuest = {
  disabled?: boolean,
  onClick: Function,
  text?: string,
};

// must use named function for default destructured parameters
const Guest = function Guest({
  disabled = false,
  onClick,
  text = "Give as Guest",
}: IGuest): Object {
  const classes = [
    "outlined--bottom",
    "outlined--light",
  ];

  let style = {
    display: "inline",
  };

  if (disabled) {
    classes.push("text-light-tertiary");
    style = { ...style, ...{ cursor: "text" } };
  } else {
    classes.push("text-dark-tertiary");
    style = { ...style, ...{ cursor: "pointer" } };
  }

  return (
    <div className="display-block soft-half-top">
      <h6 className={classes.join(" ")} style={style} onClick={onClick}>
        {text}
      </h6>
    </div>
  );
};

export default Guest;

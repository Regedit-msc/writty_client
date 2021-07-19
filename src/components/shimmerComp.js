import React from "react";
import classNames from "classnames";
import "./shimmer.css";
export default function CustomShimmer(props) {
    const p = props;
    return (
        React.cloneElement(p.children, {
            className: classNames(p.children.props.className, "shimmer_cust")
        })
    );
}
import React from 'react';
import "./Skeleton.css";

const SkeletonText = (props) => {
    return(
        <span className='skeleton skeleton-text' 
            style={{fontSize: props.size, background: (props.color ? props.color : "#e7e7e7")}}>
            {"\u00A0\u00A0".repeat(props.length)}
        </span>
    )
}
export default SkeletonText;

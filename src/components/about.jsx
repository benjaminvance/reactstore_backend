import "./about.css";
import {useState} from "react";


const About = () => {
    const [visible, setVisible] = useState(false);

    const showEmail = () => {
        setVisible(true);
    };

    const getContent = () => {
    if (visible) {
        return <h6>thebenvance@gmail.com</h6>
    }
    else {
        return <div>
            <p>Click the button below</p>
            <button onClick={showEmail} className="btn btn-primary">Show Info</button>
        </div>
    }
}

    return (
        <div className="about-page">
        <h1>Ben Vance</h1>
        {getContent()}
        {/* { visible ? <p>Email: thebenvance@gmail.com</p> }
        { !visible ? <button onClick={showEmail} className="btn btn-primary">Show Info</button> } */}
        </div>
    );
};

export default About;
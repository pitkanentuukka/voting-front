import React from "react"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Candidate from "./Candidate";

function CandidItem(props) {
    let className;
    if (props.selected) {
        className = "candiditem candiditem-selected"
    } else {
        className = "candiditem"
    }

    const handleClick = () => {
        props.handleSelectCandidate(props.id);
    }


    //const className = `candiditem${props.selected ? ' candiditem-selected' : ''}`;
    //const className = `candiditem${props.selected ? ' candiditem-selected' : 'candiditem'}`;
    ////const className = { props.selected ? 'candiditem-selected' : 'candiditem' }
    return (
        <Row>
            <div className={className} onClick={handleClick}>
                <p>Nimi: {props.name}</p>
                <p>Numero: {props.number}</p>
                <p>Puolue: {props.party}</p>
                {props.twitter && <p>Twitter: {props.twitter}</p>}
                {props.facebook && <p>Facebook: {props.facebook}</p>}
                {props.linkedin && <p>LinkedIn: {props.linkedin}</p>}
                {props.tiktok && <p>TikTok: {props.tiktok}</p>}
                {props.instagram && <p>instagram: {props.instagram}</p>}

                {props.website && <p>Sivut: {props.website}</p>}
            </div>
        </Row>
    )
}

export default CandidItem

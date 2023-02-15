import React from "react"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CandidItem(props) {
    return (
        <div className="candiditem">
            <p>Nimi: {props.name}</p>
            <p>Numero: {props.number}</p>
            {props.twitter && <p>Twitter: {props.twitter}</p>}
            {props.facebook && <p>Facebook: {props.facebook}</p>}
            {props.linkedin && <p>LinkedIn: {props.linkedin}</p>}
            {props.tiktok && <p>TikTok: {props.tiktok}</p>}
            {props.instagram && <p>instagram: {props.instagram}</p>}

            {props.website && <p>Sivut: {props.website}</p>}
        </div>
    )
}

export default CandidItem

import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit'
import React from 'react'

function Card({data}) {
    return (
        <div>
            <MDBCard className='mx-2' border='primary'>
                <MDBCardBody style={{background:'grey'}}>
                    <MDBCardTitle style={{color:"darkblue"}}>{data}</MDBCardTitle>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}

export default Card
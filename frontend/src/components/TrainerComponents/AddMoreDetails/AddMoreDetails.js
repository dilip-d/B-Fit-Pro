import React from 'react'
import styled from 'styled-components';

function AddMoreDetails() {

  const Div = styled.div`
   border: 3px solid #336699;
    border-radius: 10px;
  }
  `;
  return (
    <>
      <div className="row">
        <div className="col-sm-6 py-3 px-5">
          <Div className="card">
            <div className="card-body bg-white">
              <h5 className="card-title">Add Services</h5>
              <form>
                <input class="form-control" type="text" placeholder="Default input" aria-label="default input example" />
              </form>
              <button href="#" class="btn btn-primary mx-auto my-2">Add</button>
            </div>
          </Div>
        </div>
        <div className="col-sm-6 py-3 px-5">
          <Div className="card">
            <div className="card-body bg-white">
              <h5 className="card-title">Add Tips</h5>
              <form>
                <input class="form-control" type="text" placeholder="Default input" aria-label="default input example" />
              </form>
              <button href="#" class="btn btn-primary mx-auto my-2">Add</button>
            </div>
          </Div>
        </div>
        <div className="col-sm-6 py-3 px-5">
          <Div className="card">
            <div className="card-body bg-white border-dashed border-blue">
              <h5 className="card-title">Add Description</h5>
              <div>
                <form>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </form>
              </div>
              <button href="#" class="btn btn-primary mx-auto my-2">Add</button>
            </div>
          </Div>
        </div>
      </div>
    </>
  )
}

export default AddMoreDetails
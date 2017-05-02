import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';

class EditCategory extends React.Component {
  render() {
    return (
      <MainLayout>
        <div>
          Edit Category
          <form>
            <div className="form-group">
              <label for="exampleInputEmail1">Category Name</label>
              <input type="text" className="form-control" placeholder="Name"/>
            </div>
            <div className="form-group">
              <div className="card w-75">
                <div className="card-block">
                  <h3 className="card-title">Card title</h3>
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
              </div>
              <label for="exampleInputFile">Category Logo</label>
              <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"/>
              <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It''s a bit lighter and easily wraps to a new line.</small>
            </div>

            <button type="submit" className="btn btn-primary">Add Category</button>
          </form>
        </div>
      </MainLayout>
    );
  }
}

export default EditCategory;

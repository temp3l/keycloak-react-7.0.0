import React from 'react'
import useForm from 'react-hook-form'
import Toggle from '../toggle';
import faker from 'faker';

export const StackedUserForm = ({adm}:any) => {
    const [emailVerified, toggleVerified] = React.useState(false);
    const [enabled, toggleEnabled] = React.useState(true);
    const { register, handleSubmit, watch, errors } = useForm({defaultValues: adm.fakeUser() });

    const onSubmit = async (data:any) => {
        const payload = Object.assign({}, data, {emailVerified, enabled});
        try {
            const response = await adm.users.create(payload);
            console.log(response);
        } catch(e){
            console.log(e)
            if(e.response && e.response.data && e.response.data.errorMessage){
                return alert(e.message + '\n\n' + e.response.data.errorMessage);
            }
            alert(e.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} role="form">

            <div className="form-row">
                <div className="col-md-6 mb-3">
                    <label>First name</label>
                    <input ref={register} name="firstName" type="text" className="form-control"  placeholder="First name" required/>
                </div>
                <div className="col-md-6 mb-3">
                <label>Last name</label>
                    <input ref={register} name="lastName" type="text" className="form-control" placeholder="Last name"  required/>
                </div>
            </div>


            <div className="form-row">
                <div className="col-md-6 mb-3">
                    <label>Username</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupPrepend2">@</span>
                        </div>
                        <input ref={register} name="username" type="text" className="form-control"  placeholder="Username" aria-describedby="inputGroupPrepend2" required/>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <label>email</label>
                    <input ref={register} name="email" type="text" className="form-control"  placeholder="email" required/>
                </div>
            </div>


            <div className="form-group">
                <button onClick={ (e) => {toggleVerified(!emailVerified); e.preventDefault() } }
                    className={emailVerified === true ? "btn btn-sm btn-success" : "btn btn-sm btn-danger"}>
                    { emailVerified === true ?  <i className="fa fa-2x fa-envelope" /> : <i className="fa fa-2x fa-envelope" /> }
                </button>
                <label> &nbsp; Email {emailVerified===false ? 'not' : ''} Verified</label>
            </div>

            <div className="form-group">
                <button onClick={ (e) => {toggleEnabled(!enabled); e.preventDefault() } }
                    className={enabled === true ? "btn btn-sm btn-success" : "btn btn-sm btn-danger"}>
                    { enabled === true ?  <i className="fa fa-2x fa-toggle-on" /> : <i className="fa fa-2x fa-toggle-off" /> }
                </button>
                <label> &nbsp; User {enabled===false ? 'Disabled' : 'Enabled'}</label>
            </div>

            <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href="#">Action</a>
    <a className="dropdown-item" href="#">Another action</a>
    <a className="dropdown-item" href="#">Something else here</a>
  </div>
</div>


            <button className="btn btn-primary" type="submit">Submit form</button>
        </form>
    )
}

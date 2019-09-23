import React from 'react'
import useForm from 'react-hook-form'
// import Toggle from '../toggle';
// import faker from 'faker';
// const actions = [ 'VERIFY_EMAIL', 'UPDATE_PROFILE','CONFIGURE_TOTP','UPDATE_PASSWORD', ];

const ActionSelect = ({handleActionChange,requiredActions}:any) => {
    return (<>
        <table className="table-responsive table-sm">
            <tbody>
                <tr>
                    <td>
                        <label className="switch">
                            <input  type="checkbox" name="VERIFY_EMAIL" onChange={handleActionChange} checked={requiredActions.indexOf('VERIFY_EMAIL') !== -1}/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>VERIFY_EMAIL</td>
                    <td className="smallHelp">Sends an email to the user to verify their email address.</td>
                </tr>
                <tr>
                    <td>
                        <label className="switch">
                            <input type="checkbox" name="UPDATE_PROFILE" onChange={handleActionChange} checked={requiredActions.indexOf('UPDATE_PROFILE') !== -1}/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>UPDATE_PROFILE</td>
                    <td className="smallHelp">Requires user to enter in new personal information. </td>
                </tr>
                <tr>
                    <td>
                        <label className="switch">
                            <input type="checkbox" name="UPDATE_PASSWORD" onChange={handleActionChange} checked={requiredActions.indexOf('UPDATE_PASSWORD') !== -1}/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>UPDATE_PASSWORD</td>
                    <td className="smallHelp">Requires user to enter in a new password.</td>
                </tr>
                <tr>
                    <td>
                        <label className="switch">
                            <input type="checkbox" name="CONFIGURE_TOTP" onChange={handleActionChange} checked={requiredActions.indexOf('CONFIGURE_TOTP') !== -1}/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>CONFIGURE_TOTP</td>
                    <td className="smallHelp">Requires setup of a mobile password generator.</td>
                </tr>
            </tbody>
        </table>
    </>)
}


export const StackedUserForm = ({adm, user}:any) => {
    if(!user || !user.id) user = adm.fakeUser();
    const [emailVerified, toggleVerified] = React.useState<Boolean>(user.emailVerified);
    const [enabled, toggleEnabled] = React.useState<Boolean>(user.enabled);
    const {register, handleSubmit} = useForm({defaultValues: user });
    const [requiredActions, setActions] = React.useState<String[]>(user.requiredActions)

    const onSubmit = async (data:any) => {
        const payload = Object.assign({}, data, {emailVerified, enabled, requiredActions});
        try {
            if(user && user.id){
                console.log('payload', payload)
                const response = await adm.users.update({id:user.id}, payload);
            } else {
                const response = await adm.users.create(payload);
            }
            
        } catch(e){
            console.log(e)
            if(e.response && e.response.data && e.response.data.errorMessage){
                return alert(e.message + '\n\n' + e.response.data.errorMessage);
            }
            alert(e.message)
        }
    }

    const handleActionChange = (event:any) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(value === true && requiredActions.indexOf(name) === -1) return setActions( [...requiredActions, name] );
        setActions( requiredActions.filter(action => action !== name));
        // console.log(name, value, requiredActions.indexOf(name));
    }


    return (<>
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
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

                <br/>

                <div className="form-row">
                    <div className="col-md-6 mb-3" style={{paddingLeft:10}}>
                        <div className="form-row">
                            <div className="form-group">
                                <button onClick={ (e) => {toggleVerified(!emailVerified); e.preventDefault() } }
                                    className={emailVerified === true ? "btn btn-sm btn-success" : "btn btn-sm btn-danger"}>
                                    { emailVerified === true ?  <i className="fa fa-1x fa-envelope" /> : <i className="fa fa-1x fa-envelope" /> }
                                </button>
                                <label> &nbsp; Email {emailVerified===false ? 'not' : ''} Verified</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <button onClick={ (e) => {toggleEnabled(!enabled); e.preventDefault() } }
                                    className={enabled === true ? "btn btn-sm btn-success" : "btn btn-sm btn-danger"}>
                                    { enabled === true ?  <i className="fa fa-1x fa-toggle-on" /> : <i className="fa fa-1x fa-toggle-off" /> }
                                </button>
                                <label> &nbsp; User {enabled===false ? 'Disabled' : 'Enabled'}</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <ActionSelect handleActionChange={handleActionChange} requiredActions={requiredActions}/>
                    </div>
                </div>

                <button className="btn btn-primary" type="submit">Submit form</button>

            </form>
        </div>
    </>)
}

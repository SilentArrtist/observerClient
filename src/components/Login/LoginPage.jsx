import React,{ useState }from 'react';
import '../../styles/LoginPage.css'
const LoginPage = ({logIn}) => {
    const emailSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAADsAAAA7AF5KHG9AAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjMuNSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMTEtMTVUMjM6NDc6MjcrMDc6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTExLTE1VDIzOjQ4OjQ5KzA3OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTExLTE1VDIzOjQ4OjQ5KzA3OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiOTM4NWVlMC0wOGY2LTRlZmUtOGRmYi1jMjMyMGRlNjJkZjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6YjkzODVlZTAtMDhmNi00ZWZlLThkZmItYzIzMjBkZTYyZGY5IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YjkzODVlZTAtMDhmNi00ZWZlLThkZmItYzIzMjBkZTYyZGY5Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiOTM4NWVlMC0wOGY2LTRlZmUtOGRmYi1jMjMyMGRlNjJkZjkiIHN0RXZ0OndoZW49IjIwMjItMTEtMTVUMjM6NDc6MjcrMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy41IChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pux/rfIAAAFsSURBVDiNndM/SFVRHAfwz33vCSZaLTpGQxk6SWOKQkNbVMPb2iILIoMnSBSBgghZ2IMQGoqWQJe2CAKX5v5s0hhRkRo0poW+23BOcLkcfeUXDhfOud/f+X5/v+/JcASzAqr2h534vVNDHafwFIvoQuUfC7XwE1fjqme4j9c4i/d49J/qLmEMzzFaQw2reBuL92ChYGM3ZJgQ3E0Jrk5XkAs2v2ESJ+MPWZuCDQxHziccQF7u1RquoR+3ovoyKrHYEK7jS/EwRfiBG3iFQ1FtEdM4I/T8e+q2FC7gHfowV9ifwVG8wfkUMaVwRIjSFazjIebxG70Yx0E8xkes7KXwGG7jLr5iW2h6hzD9BrawITyGSQyWFT3ACWFKS7icUN0Zz8u4iGV04ziafxXmuInPeJIgbmEzsf8MH6KrKlqZ0J8dHBYi00oQ26Ep5PZXLd5+Tphsp/Sg9sI27uEFXmYYEOLQq/3r2A25kIiZPxHJSHSFQJDbAAAAAElFTkSuQmCC";
    const pwdSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAACXBIWXMAAADsAAAA7AF5KHG9AAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjMuNSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMTEtMTZUMDA6MDA6MzcrMDc6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTExLTE2VDAwOjA1OjE2KzA3OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTExLTE2VDAwOjA1OjE2KzA3OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyYTk1NzRmNC00ZWRiLTQ4ODEtODEzYi1kYjAxMDhhZjBjYWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MmE5NTc0ZjQtNGVkYi00ODgxLTgxM2ItZGIwMTA4YWYwY2FiIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MmE5NTc0ZjQtNGVkYi00ODgxLTgxM2ItZGIwMTA4YWYwY2FiIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyYTk1NzRmNC00ZWRiLTQ4ODEtODEzYi1kYjAxMDhhZjBjYWIiIHN0RXZ0OndoZW49IjIwMjItMTEtMTZUMDA6MDA6MzcrMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy41IChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsNSBuMAAAFTSURBVDiNhdOxS1tRFAbw30teFKSDsyjSQccODp0yKLg5+A+IUOxoh6KChYLdXQTBTXEupmtHBUVcuri51Ja6FIvQIRRJYjrc+zQk7/m+5XLPdz6+c+45N5GPcdQxir84x8+C3Eck+IBr3OAKv/ADn1B9TrwdnVYwHGM1LOEP9oqEc1E4X8DXI7+QR+7j63Nl4Qifs0slnlW8xFmJ+BQTYkuZOI2BZom4iSHhHR7F9+igXSJux7x/hNG8EMawht/4HuP96GISY9jFxxRvsYz3sfxaiXMLG7hNMY1j7JSU3ItXmKrEHvpRwSousO7pbXrRyYL9Pb4W3uESm5jt45PMIQ8tPAgblfU5gLRA/A1bwi6vC8sxgCJnaMTzS1FCRai/m8M18QZ3OVwXSVb2SIH4sMB0GO0UJzgQPkVL/nb1OqbCnN9liYuYEX5XXgu9eBBG2PgPvTpF3rED29cAAAAASUVORK5CYII=";
   const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")
    const loginFunc = ()=>{
        logIn(login,password);
    }
    return (
        <div className="loginWrapper">
            <div className="userBlock">
                <p className='loginTitle'>Login</p>
                <div className='form'>
                    <div className="txt_field">
                        <div className="txt_field_icon"><img src={emailSrc} alt="" /></div>
                        <input
                        value={login}
                        onChange={(e)=>setLogin(e.target.value)} 
                        type="text"
                        id="emailForm" 
                        autoFocus required />
                        <span></span>
                        <label>Username</label>
                        </div>
                    <div className="txt_field">
                        <div className="txt_field_icon"><img src={pwdSrc} alt="" /></div>
                        <input
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)} 
                        type = "password"
                        id="passwordForm"
                        required />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <button className='submitBtn' onClick={()=>loginFunc()}>Login</button>
                </div>
                </div>
        </div>
    );
};

export default LoginPage;
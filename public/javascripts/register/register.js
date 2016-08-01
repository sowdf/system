var LoginComponent = React.createClass({
    render : function(){
        return (
            <form id="loginform" className="form-vertical" action="http://themedesigner.in/demo/matrix-admin/index.html">
                <div className="control-group normal_text"> <h3><img src="img/logo.png" alt="Logo" /></h3></div>
                <div className="control-group">
                    <div className="controls">
                        <div className="main_input_box">
                            <span className="add-on bg_lg"><i className="icon-envelope"></i></span><input type="email" required name="email" placeholder="Email" />
                        </div>
                    </div>
                </div>
                <div className="control-group">
                    <div className="controls">
                        <div className="main_input_box">
                            <span className="add-on bg_ly"><i className="icon-lock"></i></span><input type="password" name="password" placeholder="Password" />
                        </div>
                    </div>
                </div>
                <div className="form-actions">
                    <span className="pull-right"><a href="javascript:;" className="btn btn-success" onClick={this.handleClick}> Register</a></span>
            </div>
            </form>
        );
    },
    handleClick : function(){
        var $form = $('#loginform');
        var $email = $form.find('[name=email]').val();
        var $password = $form.find('[name=password]').val();
        var fiter =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!fiter.test($email)){
            layer.alert('您的电子邮箱格式不正确!');
            return;
        }
        console.log($email,$password);
        $.ajax({
            url:'/entry/register',
            data : {email:$email,password:$password},
            dateType : 'json',
            type : 'post',
            success : function(res){
                layer.alert(res.msg,function(){
                    location.href = '/login';
                });
            }
        });
    }
});

ReactDOM.render(<LoginComponent />,document.getElementById('loginbox'));
/*


function getValue(){
    return
}*/

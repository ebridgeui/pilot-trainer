(function(n){var t={userLogin:"#loginUser",userLogout:"#userLogout",forgotPassword:"#forgotPassword",userLoginModal:"#userLoginModal",userLoginModalClose:"#userLoginModalClose",sendForgotUserPassword:"#sendForgotUserPassword",sendChangePassword:"#sendChangePassword"},i={sendForgotUserPassword:function(){var t=n("#forgotPasswordForm #ForgotEmail").val();return t===""?(modalShow("Email field is empty!"),!1):(n.post("/User/ForgotPassword",{email:t}).done(function(t){modalShow(t.data);n("#forgotPasswordForm #ForgotEmail").val("")}),!1)},changePassword:function(){var t=n("#changePasswordForm #password").val(),i=n("#changePasswordForm #newpassword").val();return t===""?(modalShow("Password is empty!"),!1):i===""?(modalShow("New Password is empty!"),!1):(n.post("/User/ChangePassword",{password:t,newpassword:i}).done(function(t){modalShow(t.data);n("#changePasswordForm #password").val("");n("#changePasswordForm #newpassword").val("")}),!1)},userLogin:function(){var i=n("#Email").val().trim(),r,u;if(i==="")return n("#loginError").html("Email field required!"),!1;if(r=n("#Password").val().trim(),r==="")return n("#loginError").html("Password field required!"),!1;n("#Email").val(i);u=n("#ReturnUrl").attr("data-value");n(".questionItem").removeClass("active");n(this).prop("disabled")?modalShow("Please wait!"):n(this).prop("disabled",!0);n("#loginError").html("");n.post("/User/Login",{Email:i,Password:r}).done(function(i){i.success==!0?window.location=u!=""?u:"/dashboard":i.multilogin?window.location="/login/block":(n(t.userLogin).removeAttr("disabled"),n("#loginError").html(i.error))})},userLogout:function(){n.post("/User/Logout",{}).done(function(n){n.success==!0&&(window.location="/")})},forgotPassword:function(){n("#loginModal").modal("hide")},userLoginModal:function(){n("#forgotPasswordModal").modal("hide");n("#loginModal").modal("show")},userLoginModalClose:function(){n("#loginError").html("")}};n(document).ready(function(){n(document).on("click",t.userLogin,{},i.userLogin);n(document).on("click",t.userLogout,{},i.userLogout);n(document).on("click",t.forgotPassword,{},i.forgotPassword);n(document).on("click",t.sendChangePassword,{},i.changePassword);n(document).on("click",t.userLoginModal,{},i.userLoginModal);n(document).on("click",t.userLoginModalClose,{},i.userLoginModalClose);n(document).on("click",t.sendForgotUserPassword,{},i.sendForgotUserPassword)});n("#userLoginModalForm input").keypress(function(t){if(t.which==13)return n("#loginUser").click(),!1})})(jQuery)
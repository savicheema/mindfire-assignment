export const renderButton = () => {
  gapi.signin2.render("my-signin2", {
    scope: "profile email",
    width: 380,
    height: 44,
    longtitle: true,
    theme: "light",
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
};

function onSuccess(googleUser) {
  console.log(
    "Logged in as: " +
      googleUser.getBasicProfile().getName() +
      " Token: " +
      googleUser.getAuthResponse().id_token
  );
}
function onFailure(error) {
  console.log(error);
}

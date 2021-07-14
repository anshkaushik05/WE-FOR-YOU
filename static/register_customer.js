const btn = document.getElementById("submit");
const atag = document.getElementsByClassName("sign_up_btn")[0];
atag.addEventListener("click", async () => {
    //  await document.getElementById("form_post").submit();
    const pass=document.getElementById("pass").value;
    const cpass=document.getElementById("cpass").value;
    // var ans=false;
    // if(document.getElementById("cpass").value===document.getElementById("pass").value)
    //     ans=true;
    // console.log(ans);
    if(pass===cpass)
        await btn.click();
    else
        await display_none();
})
function display_none(){
    document.getElementById("checkpass").style.display = "inherit";
}
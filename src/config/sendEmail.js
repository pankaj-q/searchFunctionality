const sendEmail = async() => {
    await new promise((resolve) => {
        setTimeout(resolve, 5000);
    })
    console.log("Task-compeleted");
}
export default sendEmail
document.addEventListener("DOMContentLoaded", () => {
    const submit = document.getElementById("submit");
    const name = document.getElementById("name");
    const photo = document.getElementById("photo");
    const popup = document.querySelector(".popup");
    const photoDiv = document.getElementById("student-photo-div");
    const nameDiv = document.getElementById("student-name");
    const imageDiv = document.getElementById("image");
    const loader = document.querySelector(".loader");

    function setLoading(bool) {
        if(bool) {
            submit.innerText = "";
            submit.append(loader)
            loader.classList.remove("hidden")
            submit.disabled = true;
        } else {
            loader.classList.add("hidden")
            submit.innerText = "Baixar";
            submit.disabled = false;
        }
    }

    submit.addEventListener("click", () => {
        setLoading(true)
        if(name.value == "" || photo.value == "") {
            alert("Os campos devem ser preenchidos");
            setLoading(false)
            return
        }

        nameDiv.innerText = name.value;

        const file = photo.files[0];

        photoDiv.style.backgroundPosition = "bottom"; 
        photoDiv.style.backgroundSize = "cover"; 

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;
                img.style.width = "100%";
                img.style.height = "auto";
                img.style.objectFit = "cover";
                photoDiv.innerHTML = "";
                photoDiv.appendChild(img);
            };            
            reader.readAsDataURL(file); 
        }

        setTimeout(() => {
            html2canvas(imageDiv, {
                onrendered: function (canvas) {

                    const imgData = canvas.toDataURL("image/png");

                    const downloadLink = document.createElement("a");
                    downloadLink.href = imgData;
                    downloadLink.download = `Parabens ${name.value}.png`; 
                    downloadLink.click(); 
                    setLoading(false)
                }
            });
        }, 500)
        
    });
});

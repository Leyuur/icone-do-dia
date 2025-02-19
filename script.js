document.addEventListener("DOMContentLoaded", () => {
    const submit = document.getElementById("submit");
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
            submit.innerText = "Baixar Icones do Dia";
            submit.disabled = false;
        }
    }

    submit.addEventListener("click", async() => {
        setLoading(true)

        fetch('./db/aniversarios.json').then(response => response.json()).then(data => {
            const icones = [];
            data.forEach(aluno => {
                const date = new Date();
                const newDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                if(aluno.data == newDate) {
                    icones.push({
                        nome: aluno.nome,
                        matricula: aluno.matricula
                    })
                    console.log(true)
                } else {
                    console.log(false)
                }
            });

            if (icones.length > 0) {
                let semFoto = false;
                console.log(icones)
                icones.forEach(icone => {
                    console.log(icone)
                    const nomeIcone = icone.nome.trim().split(/\s+/);
                    nameDiv.innerText = `${nomeIcone[0]} ${nomeIcone[nomeIcone.length - 1]}`;

                    if(icone.matricula.trim().length <= 7) {
                        const file = `./fotos/${icone.matricula}.jpeg`;
                        photoDiv.style.backgroundPosition = "bottom"; 
                        photoDiv.style.backgroundSize = "cover"; 
                        const img = new Image();
                        img.src = file;
                        img.style.width = "100%";
                        img.style.height = "auto";
                        img.style.objectFit = "cover";
                        photoDiv.innerHTML = "";
                        photoDiv.appendChild(img);

                        console.log("Entrou no try")
                        html2canvas(imageDiv).then(canvas => {
                            const imgData = canvas.toDataURL("image/png");
                            const downloadLink = document.createElement("a");
                            downloadLink.href = imgData;
                            downloadLink.download = `Parabens ${icone.nome}.png`; 
                            downloadLink.click(); 
                            setLoading(false);
                        }); 
                    } else {
                        semFoto = true;
                    }
                })
                if(semFoto) {
                    throw new Error("Os aniversariantes de hoje ainda não possuem a foto registrada.")
                }
            } else {
                throw new Error("Não há aniversariantes hoje.")
            }
        }).catch(error => {
            console.error(error)
            alert(error)
            setLoading(false)
        })
    });
});

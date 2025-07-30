document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch("data.json");
        const data = await res.json();
        const themeBtn = document.getElementById('theme');
        const img = document.getElementById('img');
        const LIGHT = 'light-theme';
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === LIGHT) {
            document.body.classList.add(LIGHT);
            img.src = './assets/images/icon-moon.svg';
        } else {
            img.src = './assets/images/icon-sun.svg';
        }
        themeBtn.addEventListener("click", () => {
            const isLight = document.body.classList.contains(LIGHT);

            if (isLight) {
                document.body.classList.remove(LIGHT);
                localStorage.setItem('theme', 'dark-theme');
                img.src = './assets/images/icon-sun.svg';
            } else {
                document.body.classList.add(LIGHT);
                localStorage.setItem('theme', LIGHT);
                img.src = './assets/images/icon-moon.svg';
            }
        });
        console.log(data);
        RenderExtenstions(data);
        const buttons = document.querySelectorAll('.btns');
        buttons.forEach((btns) => {
            btns.addEventListener('click', () => {
                let datafilter;
                buttons.forEach((btn) => {
                    btn.classList.remove('activebutton');
                });
                btns.classList.add('activebutton');
                const filterdata = btns.getAttribute('data-filter');
                if (filterdata === "1") {
                    datafilter = [...data];
                } else if (filterdata === "2") {
                    datafilter = data.filter(item => item.isActive === true);
                } else {
                    datafilter = data.filter(item => item.isActive === false);
                }
                RenderExtenstions(datafilter);
            })
        })
        function RenderExtenstions(data) {
            const Extensions = document.querySelector('.extensions');
            const ExtensionsHtml = data.map((item, index) => {
                return `
             <div class="extension">
                <div class="Head">
                  <div class="Image">
                    <img src=${item.logo} alt="">
                </div>
                <div class="Info">
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>
                </div>
                </div>
                <div class="actions">
                    <button data-index="${index}" class="removebtn">Remove</button>
                  <div class="active-content">
                    <div class="btn ${item.isActive ? "active" : "inactive"}" data-index="${index}">
                        <div class="ceircl"></div>
                    </div>
                  </div>
                </div>
            </div>`
            });
            Extensions.innerHTML = ExtensionsHtml.join('');
            const btns = document.querySelectorAll('.btn');
            btns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const index = btn.getAttribute('data-index');
                    if (data[index].isActive) {
                        btn.classList.remove('active');
                        btn.classList.add('inactive');
                        data[index].isActive = !data[index].isActive;
                        RenderExtenstions(data);
                    } else {
                        btn.classList.remove('inactive');
                        btn.classList.add('active');
                        data[index].isActive = !data[index].isActive;
                        RenderExtenstions(data);
                    }
                });
            });
            function Rremove(index) {
                data.splice(index, 1);
                RenderExtenstions(data);
            }
            const removebtn = document.querySelectorAll('.removebtn');
            removebtn.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const index = btn.getAttribute('data-index');
                    Rremove(index);
                })
            })

        }
    } catch (error) {
        console.log(error.message);
    }
});
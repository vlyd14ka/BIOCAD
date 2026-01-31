        document.addEventListener('DOMContentLoaded', () => {
            const logo = document.querySelector('.logo');
            if (logo) {
                logo.style.cursor = 'pointer';
                logo.addEventListener('click', () => {
                    window.location.href = '/index.html';
                });
            }
        });
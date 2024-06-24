document.addEventListener('DOMContentLoaded', () => {
    const dateForm = document.getElementById('date-form');
    const inputDate = document.getElementById('input-date');
    const resultDiv = document.getElementById('result');
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

    dateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedDate = new Date(inputDate.value);
        const currentDate = new Date();

        const differenceInMilliseconds = selectedDate - currentDate;
        const differenceInDays = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24));

        let message = '';
        if (differenceInDays > 0) {
            message = `${differenceInDays} dienas līdz ${selectedDate.toLocaleDateString('lv-LV', options)}`;
        } else if (differenceInDays < 0) {
            message = `Pagāja ${Math.abs(differenceInDays)} dienas no ${selectedDate.toLocaleDateString('lv-LV', options)}`;
        } else {
            message = `Šodien ir ${selectedDate.toLocaleDateString('lv-LV', options)}`;
        }

        resultDiv.textContent = message;
    });
});

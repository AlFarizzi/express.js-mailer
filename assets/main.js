const btn = document.getElementById('tambah');
btn.addEventListener('click', () => {
    let nama = document.getElementById('nama').value;
    let email = document.getElementById('email').value;
    axios.post('/', {nama:nama, email:email})
    .then(res => {
        if(res.data !== true) {
            swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Email Gagal Di Tambahkan'
            })
        } else {
            swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Email Berhasil Di Tambahkan'
            })
        }
        setTimeout(() => {
            location.reload();
        }, 1000);

    })
    .catch(err => {
        console.log(err);
    })
})

let hapus = Array.from(document.querySelectorAll('#hapus'));
hapus.forEach(hps => {
    hps.addEventListener('click', () => {
        let id = hps.value;
        Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.value == true) {
                axios.delete(`/${hps.dataset.id}`)
                .then(res => {
                    swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Email Berhasil Di Hapus'
                    })
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                })
            }
        })
    })
})

let kirim = document.getElementById('kirim');
kirim.addEventListener('click', () => {
    let pengirim = document.getElementById("pengirim").value;
    let penerima = document.getElementById('penerima').value;
    let subject = document.getElementById('subject').value;
    let pesan = document.getElementById('pesan').value;
    let pass = document.getElementById('password').value;
    // console.log(penerima);
    axios.post('/kirim-email', {pengirim:pengirim, penerima:penerima, subject:subject, pesan:pesan, pass:pass})
    .then(res => {
        if(res.data !== true) {
            swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Email Gagal Terkirim'
            })
        } else {
            swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Email Berhasil Terkirim'
            })
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    } )
    .catch(err => console.log(err))
})

let btns = Array.from(document.querySelectorAll('#detail_btn'));
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('detail_pengirim').value = btn.dataset.pengirim;
        document.getElementById('detail_penerima').value = btn.dataset.penerima;
        document.getElementById('detail_subject').value = btn.dataset.subject;
        document.getElementById('detail_pesan').value = btn.dataset.pesan;
    })
})
export const char = (num) => {
    let terbilang = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh']

    let teks = ''

    if(num < 12)
    {
        teks = terbilang[num]
    }else if(num < 20)
    {
        teks = `${terbilang[num-10]} belas`
    }else if(num < 100)
    {
        teks = `${terbilang[Math.floor(num / 10)]} Puluh ${terbilang [num % 10]}`
    }else
    {
        teks = 'Seratus'
    }
    return teks
}
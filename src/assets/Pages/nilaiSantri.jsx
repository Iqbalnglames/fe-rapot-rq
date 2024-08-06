export const NilaiSantri = () => {
  return(
    <>
      <h1>input Nilai Santri</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium similique dolorum voluptatibus perferendis doloremque?</p>
      <form action="">
      <span>Nama Santri</span>
      <input type="text" placeholder="Nama" />
      <span>Kelas</span>
      <input type="text" placeholder="Kelas"/>
      <span>Mata Pelajaran</span>
      <input type="text" value={'Akidah'} />
      <span>tugas_1</span>
      <input type="text" placeholder="tugas 1" />
      <span>tugas_2</span>
      <input type="text" placeholder="tugas 2" />
      <span>tugas_3</span>
      <input type="text" placeholder="tugas 3" />
      <span>UTS</span>
      <input type="text" placeholder="UTS" />
      <span>UAS</span>
      <input type="text" placeholder="UAS" />
      </form>
    </>
  )
}
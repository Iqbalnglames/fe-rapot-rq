export const Card = ({jumlah, terhitung}) => {
  return (
      <div className="w-64 drop-shadow-md overflow-hidden rounded-sm bg-gray-300 p-[1px] hover:bg-[#9e0000]">
        <div className="hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>
        <div className="rounded-sm bg-white p-6">
          <div className="space-y-3">
            <img src="https://asset.kompas.com/crops/JPC8MvbdqH4-u6o3FIdMqFLyebA=/70x0:1280x807/780x390/data/photo/2021/06/18/60cc54d56dd6c.jpg" alt="" />
            <p className="text-lg font-semibold text-slate-800">{jumlah}</p>
            <p className="font-md text-slate-500">
              {terhitung}
            </p>
          </div>
        </div>
      </div>
  );
};
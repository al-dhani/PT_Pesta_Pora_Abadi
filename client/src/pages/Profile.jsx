export default function Profile({ preview }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-2xl font-bold text-[#EC008C] mb-4">
        Profil Perusahaan
      </h3>
      <p className="text-gray-700">
        PT Pesta Pora Abadi adalah perusahaan yang bergerak di bidang food & beverage
        dan dikenal luas melalui brand Mie Gacoan yang telah berkembang pesat di
        berbagai kota di Indonesia.
      </p>

      {!preview && (
        <p className="mt-4 text-gray-700">
          Perusahaan ini fokus pada kualitas produk, pelayanan cepat, serta inovasi
          menu yang mengikuti selera pasar.
        </p>
      )}
    </div>
  );
}

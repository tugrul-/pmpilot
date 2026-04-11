import Link from 'next/link'

export default function MesafeliSatisSozlesmesiPage() {
  return (
    <main className="page legal-page">
      <header className="header">
        <Link href="/" className="logo">PMPilot</Link>
        <nav className="nav">
          <Link href="/login">Giriş Yap</Link>
          <Link href="/signup" className="btn btn-primary">Başla</Link>
        </nav>
      </header>

      <section className="legal-content">
        <p className="eyebrow">Yasal</p>
        <h1 className="legal-title">Mesafeli Satış Sözleşmesi</h1>
        <p className="legal-date">Son güncelleme: 10 Nisan 2026</p>

        <div className="legal-body">
          <p>
            Bu Mesafeli Satış Sözleşmesi ("Sözleşme"), 6502 sayılı Tüketicinin Korunması
            Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği (R.G.: 27.11.2014 / 29188)
            hükümleri uyarınca düzenlenmiştir.
          </p>

          <h2>1. Taraflar</h2>
          <h3>Satıcı</h3>
          <table className="legal-table">
            <tbody>
              <tr><td>Ünvan</td><td>Twino Yazılım Hizmetleri Ltd. Şti.</td></tr>
              <tr><td>Adres</td><td>Teknopark Ankara, İvedikOsb Mah. 2224. Cadde No: 1/116, Yenimahalle / Ankara</td></tr>
              <tr><td>Vergi Dairesi / No</td><td>İvedik / 9591429157</td></tr>
              <tr><td>MERSİS No</td><td>0859142915700001</td></tr>
              <tr><td>E-posta</td><td><a href="mailto:info@twino.digital">info@twino.digital</a></td></tr>
            </tbody>
          </table>

          <h3>Alıcı</h3>
          <p>
            Platforma kayıt olan ve ücretli plan satın alan gerçek veya tüzel kişi ("Kullanıcı").
          </p>

          <h2>2. Konu ve Kapsam</h2>
          <p>
            Bu Sözleşme, Alıcı'nın <strong>pmpilot.org</strong> adresi üzerinden satın aldığı
            dijital hizmet aboneliğine (Free, Pro, Business veya Custom plan) ilişkin hak ve
            yükümlülükleri düzenlemektedir. Hizmet; proje yönetimi, belge yönetimi ve yapay
            zeka destekli analiz araçlarından oluşan bir SaaS (hizmet olarak yazılım)
            platformudur.
          </p>

          <h2>3. Hizmet Bedeli ve Ödeme</h2>
          <ul>
            <li>Hizmet bedelleri platform üzerindeki güncel fiyatlandırma sayfasında belirtilmektedir.</li>
            <li>Abonelik ödemeleri aylık veya yıllık olarak gerçekleştirilir.</li>
            <li>Ödemeler, yetkili ödeme kuruluşları aracılığıyla güvenli biçimde alınır.</li>
            <li>Tüm fiyatlar Türk Lirası (TRY) veya ABD Doları (USD) cinsinden belirtilir ve KDV dahildir.</li>
            <li>Abonelik, iptal edilmediği sürece her dönem başında otomatik olarak yenilenir.</li>
          </ul>

          <h2>4. Hizmetin Sunulması (Teslimat)</h2>
          <p>
            PMPilot, dijital bir hizmet olduğundan fiziksel teslimat söz konusu değildir.
            Ödemenin onaylanmasının ardından Alıcı'nın hesabı ilgili plana yükseltilir ve
            hizmete erişim derhal sağlanır. Hizmetin sunulması için herhangi bir ek bekleme
            süresi bulunmamaktadır.
          </p>

          <h2>5. Cayma Hakkı</h2>
          <p>
            Tüketiciler kural olarak sözleşme tarihinden itibaren <strong>14 gün</strong> içinde
            herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma
            hakkına sahiptir.
          </p>
          <p>
            Ancak 6502 sayılı Kanun'un 49. maddesi ve Mesafeli Sözleşmeler Yönetmeliği'nin
            15. maddesi uyarınca; <strong>dijital içerik ve hizmetlerde, tüketicinin onayıyla
            ifaya başlanmış ve cayma hakkının kullanılamayacağı önceden kabul edilmişse</strong>,
            cayma hakkı kullanılamaz.
          </p>
          <p>
            Kayıt süreci tamamlanarak platforma erişim sağlandığı anda, Alıcı bu istisnayı
            kabul etmiş sayılır ve cayma hakkından feragat etmiş olur.
          </p>
          <p>
            Free (ücretsiz) plan kullanan kullanıcılar için cayma hakkı hükümleri
            uygulanmamaktadır.
          </p>

          <h2>6. Abonelik İptali</h2>
          <p>
            Alıcı, aboneliğini dilediği zaman platform üzerinden veya
            <a href="mailto:info@twino.digital"> info@twino.digital</a> adresine e-posta
            göndererek iptal edebilir. İptal işlemi, mevcut ödeme döneminin sonunda geçerli
            olur; kalan süre için ücret iadesi yapılmaz.
          </p>

          <h2>7. Gizlilik</h2>
          <p>
            Alıcı'nın kişisel verileri, <Link href="/gizlilik-politikasi">Gizlilik Politikası</Link> kapsamında
            6698 sayılı KVKK hükümlerine uygun olarak işlenir.
          </p>

          <h2>8. Mücbir Sebep</h2>
          <p>
            Doğal afet, savaş, grev, siber saldırı, altyapı kesintisi gibi tarafların
            kontrolü dışındaki mücbir sebep halleri nedeniyle hizmetin sunulamaması durumunda
            Satıcı sorumlu tutulamaz. Mücbir sebebin 30 günü aşması halinde her iki taraf da
            sözleşmeyi tazminatsız feshedebilir.
          </p>

          <h2>9. Uyuşmazlık Çözümü</h2>
          <p>
            Bu Sözleşme'den doğabilecek uyuşmazlıklarda öncelikle müzakere yoluyla çözüm
            aranır. Çözüme kavuşturulamazsa; Türk tüketiciler için ilgili Tüketici Hakem
            Heyeti veya Tüketici Mahkemesi, tüzel kişiler için Ankara Mahkemeleri ve İcra
            Daireleri yetkilidir. Sözleşmeye Türk hukuku uygulanır.
          </p>

          <h2>10. Yürürlük</h2>
          <p>
            Bu Sözleşme, Alıcı'nın kayıt ve satın alma işlemini tamamladığı anda yürürlüğe
            girer ve her iki tarafı bağlar.
          </p>
        </div>
      </section>

      <footer className="legal-footer">
        <Link href="/">← Ana Sayfaya Dön</Link>
        <span>© 2026 PMPilot · Twino Yazılım Hizmetleri Ltd. Şti.</span>
      </footer>
    </main>
  )
}

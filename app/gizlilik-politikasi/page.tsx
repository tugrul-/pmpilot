import Link from 'next/link'

export default function GizlilikPolitikasiPage() {
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
        <h1 className="legal-title">Gizlilik Politikası</h1>
        <p className="legal-date">Son güncelleme: 10 Nisan 2026</p>

        <div className="legal-body">
          <p>
            Bu Gizlilik Politikası; <strong>Twino Yazılım Hizmetleri Ltd. Şti.</strong> ("Şirket",
            "biz") tarafından işletilen <strong>pmpilot.org</strong> adresindeki platform
            aracılığıyla toplanan kişisel verilerin 6698 sayılı Kişisel Verilerin Korunması
            Kanunu (KVKK) kapsamında nasıl işlendiğini açıklamaktadır.
          </p>

          <h2>1. Veri Sorumlusu</h2>
          <table className="legal-table">
            <tbody>
              <tr><td>Ünvan</td><td>Twino Yazılım Hizmetleri Ltd. Şti.</td></tr>
              <tr><td>Adres</td><td>Teknopark Ankara, İvedikOsb Mah. 2224. Cadde No: 1/116, Yenimahalle / Ankara</td></tr>
              <tr><td>E-posta</td><td><a href="mailto:info@twino.digital">info@twino.digital</a></td></tr>
            </tbody>
          </table>

          <h2>2. Toplanan Kişisel Veriler</h2>
          <p>Platformumuzu kullandığınızda aşağıdaki kişisel veriler işlenebilir:</p>
          <ul>
            <li><strong>Kimlik ve iletişim bilgileri:</strong> Ad, soyad, e-posta adresi</li>
            <li><strong>Hesap bilgileri:</strong> Kullanıcı adı, şifrelenmiş parola</li>
            <li><strong>Kullanım verileri:</strong> Platform içi işlemler, oturum bilgileri, IP adresi, tarayıcı türü</li>
            <li><strong>İçerik verileri:</strong> Platforma yüklediğiniz proje belgeleri ve proje bilgileri</li>
            <li><strong>Ödeme bilgileri:</strong> Ödeme işlemleri yetkili ödeme kuruluşları aracılığıyla gerçekleştirilir; kart bilgileri tarafımızca saklanmaz.</li>
          </ul>

          <h2>3. Verilerin İşlenme Amaçları ve Hukuki Dayanakları</h2>
          <ul>
            <li>Hizmetin sunulması ve hesap yönetimi (KVKK m.5/2-c — sözleşmenin ifası)</li>
            <li>Kullanıcı desteği ve iletişim (KVKK m.5/2-c)</li>
            <li>Faturalandırma ve muhasebe işlemleri (KVKK m.5/2-ç — kanuni yükümlülük)</li>
            <li>Platformun güvenliği ve sahteciliğin önlenmesi (KVKK m.5/2-f — meşru menfaat)</li>
            <li>Hizmet kalitesinin iyileştirilmesi ve yeni özellik geliştirme (KVKK m.5/2-f — meşru menfaat)</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi (KVKK m.5/2-ç)</li>
          </ul>

          <h2>4. Verilerin Aktarımı</h2>
          <p>Kişisel verileriniz aşağıdaki taraflarla paylaşılabilir:</p>
          <ul>
            <li><strong>Supabase Inc.:</strong> Veritabanı ve kimlik doğrulama altyapısı (ABD — SCCs kapsamında)</li>
            <li><strong>Vercel Inc.:</strong> Uygulama barındırma hizmetleri (ABD — SCCs kapsamında)</li>
            <li><strong>Ödeme kuruluşları:</strong> Yasal ödeme işlemleri için</li>
            <li><strong>Yetkili kamu kurumları:</strong> Yasal zorunluluk halinde</li>
          </ul>
          <p>Verileriniz yukarıda belirtilenler dışında üçüncü taraflarla satılmaz veya kiralanmaz.</p>

          <h2>5. Çerezler (Cookies)</h2>
          <p>
            Platform; oturum yönetimi için zorunlu çerezler kullanmaktadır. Bu çerezler olmadan
            platforma giriş yapılamaz. Üçüncü taraf pazarlama çerezi kullanılmamaktadır.
          </p>

          <h2>6. Verilerin Saklanma Süresi</h2>
          <ul>
            <li>Hesap verileri: Hesabın aktif olduğu süre boyunca ve hesap silinmesinin ardından yasal yükümlülükler kapsamında en fazla 10 yıl</li>
            <li>Fatura ve muhasebe kayıtları: 10 yıl (Türk Ticaret Kanunu gereği)</li>
            <li>Sistem logları: 2 yıl</li>
          </ul>

          <h2>7. Haklarınız (KVKK Madde 11)</h2>
          <p>Kişisel verilerinize ilişkin olarak aşağıdaki haklara sahipsiniz:</p>
          <ul>
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
            <li>İşlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
            <li>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme</li>
            <li>Kanunda öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
            <li>Otomatik sistemler aracılığıyla analiz edilmesi sonucu aleyhinize çıkan kararlara itiraz etme</li>
            <li>Kanuna aykırı işleme nedeniyle uğradığınız zararın giderilmesini talep etme</li>
          </ul>
          <p>
            Haklarınızı kullanmak için <a href="mailto:info@twino.digital">info@twino.digital</a> adresine
            yazılı başvuruda bulunabilirsiniz.
          </p>

          <h2>8. Güvenlik</h2>
          <p>
            Kişisel verilerinizin korunması için teknik ve idari güvenlik önlemleri uygulanmaktadır.
            Veriler şifreli bağlantı (HTTPS/TLS) ile iletilmekte, erişim yetkisi kısıtlı tutulmaktadır.
          </p>

          <h2>9. Politika Değişiklikleri</h2>
          <p>
            Bu politika zaman zaman güncellenebilir. Önemli değişiklikler platform üzerinden
            duyurulacaktır. Güncel politikaya her zaman bu sayfadan ulaşabilirsiniz.
          </p>

          <h2>10. İletişim</h2>
          <p>
            Gizlilik politikamıza ilişkin sorularınız için:
            <a href="mailto:info@twino.digital"> info@twino.digital</a>
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

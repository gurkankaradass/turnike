import logo from "../images/turnike-footer-logo.png"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Container, Dialog, DialogContent, DialogTitle } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useDispatch } from "react-redux";
import { setEvents, setLoading } from "../redux/appSlice";
import { useEffect, useState } from "react";
import { CategoryType, EventType } from "../types/Types";
import categoryService from "../services/CategoryService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import eventService from "../services/EventService";
import "../css/Footer.css"

function Footer() {

    const dispatch = useDispatch();
    const [categories, setCategories] = useState<CategoryType[]>();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClickOpen1 = () => {
        setOpen1(true);
    }
    const handleClickOpen2 = () => {
        setOpen2(true);
    }
    const handleClickOpen3 = () => {
        setOpen3(true);
    }
    const handleClickOpen4 = () => {
        setOpen4(true);
    }

    const handleClose = () => {
        setOpen(false)
    }
    const handleClose1 = () => {
        setOpen1(false)
    }
    const handleClose2 = () => {
        setOpen2(false)
    }
    const handleClose3 = () => {
        setOpen3(false)
    }
    const handleClose4 = () => {
        setOpen4(false)
    }

    const getAllCategories = async () => {
        try {
            dispatch(setLoading(true))
            const categories: CategoryType[] = await categoryService.gettAllCategories();
            setCategories(categories);
        } catch (error) {
            toast.error("Kategoriler Getirilirken Hata Oluştu")
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleCategory = async (e: React.MouseEvent<HTMLLIElement, MouseEvent>, categoryName: string) => {
        try {
            dispatch(setLoading(true));
            const events: EventType[] = await categoryService.getEventsByCategoryName(categoryName);
            navigate("/category/" + categoryName)
            dispatch(setEvents(events));
        } catch (error) {

        } finally {
            dispatch(setLoading(false))
        }
    }

    const logoButton = async () => {
        try {
            dispatch(setLoading(true))
            const events: EventType[] = await eventService.getAllEvents();
            dispatch(setEvents(events))
            navigate("/")
        } catch (error) {
            toast.error("Etkinlikler Getirilirken Hata Oluştu")
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <div className="footer-main">
            <Container>
                <div className="footer-top">
                    <img onClick={logoButton} className="footer-logo" src={logo} width={200} height={80} />
                    <hr />
                    <p className="footer-text">Turnike, organizatörler tarafından düzenlenen farklı kategorilerdeki etkinlikleri, dijital medya platformlarını kullanarak milyonlara ulaştıran yeni nesil online bilet satış sitesidir.</p>
                    <hr />
                    <div className="social-div">
                        <FacebookIcon sx={{ cursor: "pointer" }} />
                        <InstagramIcon sx={{ marginLeft: "8px", cursor: "pointer" }} />
                        <XIcon sx={{ marginLeft: "8px", cursor: "pointer" }} />
                        <YouTubeIcon sx={{ marginLeft: "8px", cursor: "pointer" }} />
                    </div>
                </div>
                <hr />
                <div className="footer-middle">
                    <div className="company-div">
                        <ul>
                            <h3>KURUMSAL</h3>
                            <li onClick={handleClickOpen}>Hakkımızda</li>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                            >
                                <DialogTitle>
                                    <h3>HAKKIMIZDA</h3>
                                </DialogTitle>
                                <DialogContent sx={{ fontFamily: "arial", lineHeight: "1.4" }}>
                                    <p>
                                        Turnike, kültür ve eğlence dünyasının kapılarını size aralamak için kurulmuş bir etkinlik platformudur. Sanatseverler, macera tutkunları ve eğlenceyi seven herkesi bir araya getiren Turnike, konserlerden tiyatroya, sinemadan stand-up gösterilerine kadar geniş bir etkinlik yelpazesi sunar.
                                    </p>
                                    <br />
                                    <p>
                                        Amacımız, kullanıcılarımızın en sevdiği etkinlikleri kolayca keşfetmelerini, etkinlik detaylarına hızlıca ulaşmalarını ve unutulmaz anlar yaşamalarını sağlamaktır. Gelişmiş arayüzümüz ve kullanıcı dostu tasarımımızla, bir sonraki favori etkinliğinizi bulmak artık çok daha kolay!
                                    </p>
                                    <br />
                                    <p>
                                        Turnike'de yalnızca etkinlikleri keşfetmekle kalmaz, aynı zamanda özel kampanyalar ve güncel haberlerle de güncel kalabilirsiniz. Herkes için bir şeyler sunmayı hedeflediğimiz bu platformda, sizlere en iyi deneyimi sunmak için çalışıyoruz.
                                    </p>
                                    <br />
                                    <p>
                                        Bizimle Turnike'nin kapısını aralayın, kültür ve eğlencenin bir parçası olun!
                                    </p>
                                    <br />
                                    <h3>Misyonumuz</h3>
                                    <p>
                                        Eğlenceye kolay erişim sağlayarak, insanları birbirine bağlamak ve hayatlarına renk katmak.
                                    </p>
                                    <br />
                                    <h3>Vizyonumuz</h3>
                                    <p>
                                        Türkiye’nin en kapsamlı ve güvenilir etkinlik platformu olmak.
                                    </p>
                                </DialogContent>
                            </Dialog>
                            <li onClick={handleClickOpen1}>KVKK</li>
                            <Dialog
                                open={open1}
                                onClose={handleClose1}
                            >
                                <DialogTitle>
                                    <h3>Kişisel Verilerin Korunması ve İşlenmesi Politikası (KVKK)</h3>
                                </DialogTitle>
                                <DialogContent sx={{ fontFamily: "arial", lineHeight: "1.4" }}>
                                    <p>
                                        Turnike olarak, kullanıcılarımızın gizliliğini ve kişisel verilerinin korunmasını en önemli önceliklerimizden biri olarak kabul ediyoruz. Bu kapsamda, 6698 Sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) çerçevesinde kişisel verilerinizin güvenliğini sağlamak ve şeffaf bir şekilde bilgilendirmek amacıyla bu politikayı hazırladık.
                                    </p>
                                    <br />
                                    <h3>Kişisel Verilerinizin Toplanma Amacı</h3>
                                    <p>
                                        Turnike, etkinliklere katılımınızı kolaylaştırmak, kullanıcı deneyiminizi geliştirmek, size özel kampanyalar ve hizmetler sunmak, yasal yükümlülüklerini yerine getirmek amacıyla kişisel verilerinizi toplar ve işler.
                                    </p>
                                    <br />
                                    <h3>Toplanan Veriler ve İşleme Yöntemi</h3>
                                    <p>
                                        Turnike, sizinle iletişim kurmak ve size en iyi hizmeti sunabilmek için şu bilgileri toplayabilir:

                                        Adınız, soyadınız
                                        E-posta adresiniz
                                        Telefon numaranız
                                        Etkinlik tercihleri ve geçmişiniz
                                        IP adresiniz ve çerezler yoluyla alınan diğer veriler
                                        Bu veriler, yasal dayanaklara uygun olarak fiziksel ya da elektronik ortamda toplanır ve işlenir.
                                    </p>
                                    <br />
                                    <h3>Kişisel Verilerin Paylaşımı</h3>
                                    <p>
                                        Kişisel verileriniz, yalnızca hizmetlerimizi sunmak amacıyla iş ortaklarımız, hukuki zorunluluk hallerinde yetkili kurum ve kuruluşlarla paylaşılabilir. Bu paylaşımlar, KVKK ve ilgili diğer mevzuata uygun olarak gerçekleştirilir.
                                    </p>
                                    <br />
                                    <h3>Kişisel Verilerin Güvenliği</h3>
                                    <p>
                                        Turnike, kişisel verilerinizin izinsiz erişim, kayıp veya kötüye kullanımını önlemek için gerekli teknik ve idari tedbirleri alır.
                                    </p>
                                    <br />
                                    <h3>Haklarınız</h3>
                                    <p>
                                        KVKK’nın 11. maddesi kapsamında, kişisel verilerinizle ilgili şu haklara sahipsiniz:

                                        Kişisel verilerinizin işlenip işlenmediğini öğrenmek,
                                        İşlenme amacını ve bu amaca uygun kullanılıp kullanılmadığını öğrenmek,
                                        Yanlış veya eksik işlenen verilerin düzeltilmesini talep etmek,
                                        Kişisel verilerinizin silinmesini veya yok edilmesini talep etmek,
                                        Verilerinizi hangi üçüncü taraflarla paylaştığımızı öğrenmek.
                                    </p>
                                    <br />
                                    <h3>İletişim</h3>
                                    <p>
                                        KVKK kapsamında haklarınızı kullanmak veya daha fazla bilgi almak için bizimle iletişime geçebilirsiniz: <br /> <br />

                                        E-posta: kvkk@turnike.com <br />
                                        Telefon: +90 (506) 064-6981 <br />
                                    </p>
                                    <br />
                                    <p>Turnike olarak, kişisel verilerinizin korunması konusunda her zaman yanınızdayız. Daha fazla bilgi için Gizlilik Politikası sayfamızı ziyaret edebilirsiniz.Turnike olarak, kişisel verilerinizin korunması konusunda her zaman yanınızdayız. Daha fazla bilgi için Gizlilik Politikası sayfamızı ziyaret edebilirsiniz.</p>
                                </DialogContent>
                            </Dialog>
                            <li onClick={handleClickOpen2}>Kullanım Koşulları</li>
                            <Dialog
                                open={open2}
                                onClose={handleClose2}
                            >
                                <DialogTitle>
                                    <h3>Kullanım Koşulları</h3>
                                </DialogTitle>
                                <DialogContent sx={{ fontFamily: "arial", lineHeight: "1.4" }}>
                                    <p>
                                        Turnike web sitesi ("Site") üzerinden sağlanan hizmetleri kullanmadan önce, aşağıdaki kullanım koşullarını dikkatlice okumanız önemlidir. Bu koşullar, Siteyi kullanmanızla ilgili haklarınızı, sorumluluklarınızı ve yükümlülüklerinizi belirler. Siteyi kullanarak, bu kullanım koşullarını kabul etmiş olursunuz. Eğer bu koşulları kabul etmiyorsanız, Siteyi kullanmamayı tercih etmeniz gerekmektedir.
                                    </p>
                                    <br />
                                    <h3>Hizmet Tanımı</h3>
                                    <p>
                                        Turnike, kullanıcılarına etkinliklere katılım sağlamak, etkinlikleri keşfetmek, rezervasyon yapmak, etkinliklere ait bilgiler almak ve diğer ilgili hizmetleri sunan bir platformdur. Site, kişisel ve ticari olmayan kullanım amaçlıdır.
                                    </p>
                                    <br />
                                    <h3>Hesap Oluşturma ve Güvenlik</h3>
                                    <p>
                                        Siteyi kullanmak için kullanıcı hesabı oluşturmanız gerekebilir. Hesap oluşturduktan sonra, hesabınızın güvenliğinden tamamen siz sorumlusunuz. Hesap bilgilerinizi ve şifrenizi üçüncü şahıslarla paylaşmamanız önemlidir. Hesabınızın kötüye kullanılması durumunda Turnike, hesabınızı askıya alabilir veya silebilir.
                                    </p>
                                    <br />
                                    <h3>Kullanıcı Sorumlulukları</h3>
                                    <p>
                                        Kullanıcı olarak, aşağıdaki davranışlardan kaçınmalısınız:

                                        Siteyi, yasa dışı, zararlı, tehdit edici, iftira niteliğinde veya başka şekilde zarar verici faaliyetler için kullanmak.
                                        Turnike'ye veya diğer kullanıcılara zarar verecek şekilde, yanlış, yanıltıcı veya eksik bilgi sağlamak.
                                        Başkalarının kişisel verilerini toplamak veya kullanmak.
                                        Sisteme, sunuculara veya ağlara izinsiz erişim sağlamak veya bunlara zarar vermek.
                                    </p>
                                    <br />
                                    <h3>İçerik</h3>
                                    <p>
                                        Turnike, kullanıcılara çeşitli etkinlikler hakkında bilgiler sunar. Sitedeki içerik, metin, görsel, video ve diğer materyallerin tüm telif hakları ve fikri mülkiyet hakları Turnike’ye aittir. Siteyi kullanarak, içeriği sadece kişisel ve ticari olmayan kullanım için görüntüleyebilirsiniz. Herhangi bir içeriğin izinsiz çoğaltılması, dağıtılması, değiştirilmesi veya ticari amaçla kullanılması yasaktır.
                                    </p>
                                    <br />
                                    <h3>Üçüncü Taraf Siteleri</h3>
                                    <p>
                                        Site, üçüncü taraf web sitelerine ve hizmetlere bağlantılar (linkler) sağlayabilir. Bu bağlantılar, sadece kullanıcıları bilgilendirme amacıyla sağlanmaktadır ve Turnike, bu üçüncü taraf sitelerinin içeriği veya güvenliği hakkında herhangi bir sorumluluk taşımaz. Üçüncü taraf sitelerini kullanmadan önce, ilgili siteyi ve kullanım koşullarını dikkatlice okumanız önemlidir.
                                    </p>
                                    <br />
                                    <h3>Veri Toplama ve Kullanım</h3>
                                    <p>
                                        Turnike, kullanıcı deneyimini geliştirmek ve hizmetlerini sunmak için kişisel verilerinizi toplayabilir ve işleyebilir. Kişisel verilerinizin işlenmesi, Gizlilik Politikası ve Çerez Politikası ile belirlenen kurallara uygun olarak yapılır. Siteyi kullanarak, bu politikalara onay verdiğinizi kabul ediyorsunuz.
                                    </p>
                                    <br />
                                    <h3>Hizmetlerin Değiştirilmesi veya Durdurulması</h3>
                                    <p>
                                        Turnike, herhangi bir zamanda Siteyi veya sunduğu hizmetleri değiştirme, askıya alma, geçici olarak durdurma veya sona erdirme hakkına sahiptir. Bu tür değişiklikler, kullanıcılar için önceden bildirilmeden yapılabilir.
                                    </p>
                                    <br />
                                    <h3>Sorumluluk Reddi</h3>
                                    <p>
                                        Turnike, Site üzerinden sağlanan hizmetlerin kesintisiz, hatasız veya güvenli olacağını garanti etmez. Siteyi kullanırken meydana gelebilecek herhangi bir teknik aksaklık, kayıp veya zarar ile ilgili olarak Turnike'nin herhangi bir sorumluluğu yoktur. Kullanıcı, Siteyi kullanırken kendi riskini üstlenir.
                                    </p>
                                    <br />
                                    <h3>Hukuki Uyuşmazlıklar</h3>
                                    <p>
                                        Bu kullanım koşulları, Türkiye Cumhuriyeti yasalarına tabidir ve herhangi bir uyuşmazlık durumunda İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
                                    </p>
                                    <br />
                                    <h3>Değişiklikler</h3>
                                    <p>
                                        Turnike, bu kullanım koşullarını zaman zaman değiştirebilir. Yapılacak değişiklikler, bu sayfada yayımlandığı andan itibaren geçerli olacaktır. Kullanıcılar, Siteyi kullanmaya devam ederek bu değişiklikleri kabul etmiş sayılır.
                                    </p>
                                    <br />
                                    <h3>İletişim</h3>
                                    <p>
                                        Kullanım koşulları ile ilgili sorularınız veya şikayetleriniz için bizimle aşağıdaki iletişim kanallarından iletişime geçebilirsiniz: <br /> <br />

                                        E-posta: destek@turnike.com <br />
                                        Telefon: +90 (506) 064-6981 <br />
                                    </p>
                                    <br />
                                    <p>Turnike, kullanıcı deneyimini geliştirmek için sürekli olarak çalışmaktadır. Hizmetlerimizle ilgili her türlü geri bildiriminiz bizim için değerlidir.</p>
                                </DialogContent>
                            </Dialog>
                            <li onClick={handleClickOpen3}>Gizlilik Politikası</li>
                            <Dialog
                                open={open3}
                                onClose={handleClose3}
                            >
                                <DialogTitle>
                                    <h3>Gizlilik Politikası</h3>
                                </DialogTitle>
                                <DialogContent sx={{ fontFamily: "arial", lineHeight: "1.4" }}>
                                    <p>
                                        Turnike olarak, kullanıcılarımızın kişisel verilerinin güvenliği ve gizliliğine büyük önem veriyoruz. Bu Gizlilik Politikası, kişisel verilerinizin toplanması, kullanılması, korunması ve paylaşılması ile ilgili uygulamalarımızı açıkça belirtmektedir. 6698 sayılı Kişisel Verilerin Korunması Kanunu'na (KVKK) ve diğer yasal düzenlemelere uygun olarak, kişisel verilerinizin gizliliğini ve güvenliğini sağlamak amacıyla gerekli tedbirleri alıyoruz.
                                    </p>
                                    <br />
                                    <h3>Toplanan Kişisel Veriler</h3>
                                    <p>
                                        Kişisel verileriniz, Turnike platformunu kullanırken çeşitli yollarla toplanabilir. Bu veriler şunları içerebilir:<br /><br />

                                        Ad, soyad, e-posta adresi, telefon numarası<br />
                                        Etkinlik tercihleri ve geçmişi<br />
                                        IP adresi, çerezler ve tarayıcı bilgileri<br />
                                        Ödeme bilgileri (gerektiğinde)<br />
                                        Kullanıcı geri bildirimleri ve şikayetleri
                                    </p>
                                    <br />
                                    <h3>Kişisel Verilerin Kullanılma Amaçları</h3>
                                    <p>
                                        Toplanan kişisel verileriniz, aşağıdaki amaçlarla kullanılabilir:<br /><br />

                                        Etkinlikleri sunmak, kişiselleştirilmiş hizmetler sağlamak<br />
                                        Kullanıcı hesap yönetimi ve oturum açma işlemlerini gerçekleştirmek<br />
                                        Etkinlikler, kampanyalar ve özel tekliflerle ilgili size bilgilendirme yapmak<br />
                                        Müşteri hizmetleri sağlamak ve destek taleplerine cevap vermek<br />
                                        Yasal yükümlülüklerimizi yerine getirmek
                                    </p>
                                    <br />
                                    <h3>Verilerin Paylaşımı</h3>
                                    <p>
                                        Kişisel verileriniz, aşağıdaki durumlar dışında üçüncü şahıslarla paylaşılmaz:<br /><br />

                                        Yasal düzenlemelere veya resmi taleplere uygun olarak<br />
                                        Hizmet sağlayıcılarımızla, sadece belirtilen hizmetlerin sunulması için paylaşılabilir<br />
                                        İş ortaklarımızla, yalnızca etkinlikler ve kampanyalarla ilgili bilgilendirme amaçlı
                                    </p>
                                    <br />
                                    <h3>Çerezler (Cookies) ve Benzeri Teknolojiler</h3>
                                    <p>
                                        Turnike, platformu daha iyi bir deneyim sunmak için çerezler ve benzeri teknolojiler kullanabilir. Bu çerezler, kullanıcı tercihlerini ve gezinme geçmişini hatırlayarak kişiselleştirilmiş içerik sunulmasını sağlar. Çerezler, internet tarayıcıları üzerinden kontrol edilebilir ve silinebilir.
                                    </p>
                                    <br />
                                    <h3>Verilerin Güvenliği</h3>
                                    <p>
                                        Kişisel verilerinizin güvenliğini sağlamak amacıyla, Turnike, modern güvenlik önlemleri ve teknik tedbirler alır. Verileriniz, yetkisiz erişime karşı korunur ve yalnızca yetkilendirilmiş kişiler tarafından erişilebilir.
                                    </p>
                                    <br />
                                    <h3>Kişisel Verilerin Saklanma Süresi</h3>
                                    <p>
                                        Kişisel verileriniz, toplandığı amaç için gerekli olan süre boyunca saklanır. Yasal bir yükümlülük olmadıkça ve veri işleme amacı ortadan kalktığında verileriniz silinir veya anonim hale getirilir.
                                    </p>
                                    <br />
                                    <h3>Haklarınız</h3>
                                    <p>
                                        KVKK uyarınca, kişisel verilerinizle ilgili şu haklara sahipsiniz:<br /><br />

                                        Kişisel verilerinizin işlenip işlenmediğini öğrenme<br />
                                        İşlenen verilerinizin düzeltilmesini veya silinmesini talep etme<br />
                                        Verilerinizin işlenme amacını öğrenme<br />
                                        Verilerinizin yasal olmayan şekilde işlendiğini düşündüğünüzde itiraz etme<br /><br />
                                        Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.
                                    </p>
                                    <br />
                                    <h3>İletişim</h3>
                                    <p>
                                        Kişisel verilerinizin korunması ve gizliliği ile ilgili sorularınız, talepleriniz veya şikayetleriniz için aşağıdaki iletişim kanallarını kullanabilirsiniz: <br /> <br />

                                        E-posta: gizlilik@turnike.com <br />
                                        Telefon: +90 (506) 064-6981 <br />
                                    </p>
                                    <br />
                                    <p>Turnike, kişisel verilerinizin güvenliği konusunda her zaman yanınızdadır ve gizliliğinizi koruma taahhüdü ile hareket etmektedir. Bu Gizlilik Politikası zaman zaman güncellenebilir. Yapılacak değişiklikler web sitemizde yayımlandığı andan itibaren geçerli olacaktır.</p>
                                </DialogContent>
                            </Dialog>
                            <li onClick={handleClickOpen4}>Çerez Politikası</li>
                            <Dialog
                                open={open4}
                                onClose={handleClose4}
                            >
                                <DialogTitle>
                                    <h3>Çerez Politikası</h3>
                                </DialogTitle>
                                <DialogContent sx={{ fontFamily: "arial", lineHeight: "1.4" }}>
                                    <p>
                                        Turnike olarak, kullanıcı deneyiminizi geliştirmek ve size daha iyi hizmet sunabilmek amacıyla çerezler ve benzeri teknolojiler kullanıyoruz. Bu Çerez Politikası, çerezlerin ne şekilde kullanıldığını, hangi verilerin toplandığını ve bu verilerin nasıl işlendiğini açıklamaktadır.
                                    </p>
                                    <br />
                                    <h3>Çerez Nedir?</h3>
                                    <p>
                                        Çerezler, bir web sitesine girdiğinizde cihazınıza yerleştirilen küçük metin dosyalarıdır. Çerezler, kullanıcı tercihlerini hatırlamak, site kullanımını analiz etmek ve kişiselleştirilmiş içerik sunmak için kullanılır.
                                    </p>
                                    <br />
                                    <h3>Kullandığımız Çerez Türleri</h3>
                                    <p>
                                        Turnike, farklı amaçlarla aşağıdaki türde çerezleri kullanmaktadır:<br /><br />

                                        Kesinlikle Gerekli Çerezler: Web sitesinin temel işlevlerini yerine getiren, örneğin kullanıcı oturumlarını yönetmek için kullanılan çerezlerdir. Bu çerezler, web sitesi düzgün çalışabilmesi için gereklidir ve genellikle tarayıcı ayarlarını değiştirmek yoluyla devre dışı bırakılamaz.<br /><br />

                                        Performans Çerezleri: Web sitesinin kullanımını analiz eden çerezlerdir. Hangi sayfaların ziyaret edildiği, sayfa görüntüleme sayıları ve ziyaretçilerin sitedeki gezinme yolları gibi bilgiler toplayarak, sitenin performansını artırmak amacıyla kullanılır.<br /><br />

                                        Fonksiyonel Çerezler: Kullanıcı tercihlerini hatırlamak ve daha kişiselleştirilmiş deneyim sunmak için kullanılan çerezlerdir. Örneğin, dil tercihinizi ya da önceki ziyaretlerinizde girilen bilgileri hatırlamak gibi fonksiyonlar sağlar.<br /><br />

                                        Reklam Çerezleri: Web sitesine giriş yaptıktan sonra sizinle ilgili ilgi alanlarına dayalı reklamlar gösterilmesine olanak tanır. Bu çerezler, sizinle benzer özelliklere sahip kullanıcıları hedeflemek ve kişiselleştirilmiş reklamlar sunmak için kullanılabilir.
                                    </p>
                                    <br />
                                    <h3>Çerezlerin Kullanım Amacı</h3>
                                    <p>
                                        Turnike olarak, çerezleri aşağıdaki amaçlarla kullanıyoruz:<br /><br />

                                        Web sitemizin temel işlevlerinin düzgün çalışmasını sağlamak<br />
                                        Kullanıcı deneyimini iyileştirmek ve siteyi kişiselleştirmek<br />
                                        Web sitesinin performansını izlemek ve analiz etmek
                                        Kullanıcılara kişiselleştirilmiş reklamlar ve içerikler sunmak
                                    </p>
                                    <br />
                                    <h3>Çerezlerin Yönetilmesi ve Silinmesi</h3>
                                    <p>
                                        Tarayıcınızda çerezleri yönetmek ve silmek tamamen sizin kontrolünüzdedir. Çoğu tarayıcı, çerezleri kabul etme, reddetme veya otomatik olarak silme seçenekleri sunar. Çerez ayarlarınızı değiştirmek için tarayıcınızın ayarlar bölümünü kullanabilirsiniz.<br /><br />

                                        Çerezleri devre dışı bırakmak: Tarayıcınızın çerez ayarları menüsünden tüm çerezleri devre dışı bırakabilir veya belirli türdeki çerezleri engelleyebilirsiniz. Ancak, çerezlerin devre dışı bırakılması, web sitemizin bazı özelliklerinin düzgün çalışmamasına neden olabilir.<br /><br />

                                        Çerezleri silmek: Çerezleri tarayıcınızın geçmişinden manuel olarak silebilirsiniz. Çerezler, cihazınıza kaydedildiği için her bir cihazda bu işlemi yapmanız gerekebilir.<br /><br />

                                        Çerez ayarlarını değiştirmek için, kullandığınız tarayıcıya göre ilgili adımları takip edebilirsiniz:<br /><br />

                                        Google Chrome: Ayarlar - Gizlilik ve güvenlik - Çerezler ve diğer site verileri<br />
                                        Mozilla Firefox: Ayarlar - Gizlilik ve Güvenlik - Çerezler ve Site Verileri<br />
                                        Safari: Ayarlar - Gizlilik - Çerezler ve Web Site Verileri
                                    </p>
                                    <br />
                                    <h3>Üçüncü Taraf Çerezleri</h3>
                                    <p>
                                        Turnike, bazı özellikleri sağlamak için üçüncü taraf hizmet sağlayıcıları ile çalışmaktadır. Bu üçüncü taraflar, kendi çerezlerini kullanabilirler. Örneğin, analiz araçları (Google Analytics) veya reklam sağlayıcıları, kullanıcı davranışını izlemek amacıyla kendi çerezlerini yerleştirebilirler. Bu çerezler üzerinde Turnike'nin kontrolü yoktur. Üçüncü tarafların çerez kullanımını daha detaylı öğrenmek için, ilgili üçüncü tarafların gizlilik ve çerez politikalarını incelemenizi öneririz.
                                    </p>
                                    <br />
                                    <h3>Çerez Politikası Güncellemeleri</h3>
                                    <p>
                                        Turnike, çerez politikalarını zaman zaman güncelleyebilir. Yapılacak değişiklikler, bu sayfada yayınlanacak ve değişikliklerin geçerlilik tarihi belirtilecektir. Çerez politikamızda yapılan değişiklikler, yayınlandığı andan itibaren geçerli olacaktır.
                                    </p>
                                    <br />
                                    <h3>İletişim</h3>
                                    <p>
                                        Çerez politikamızla ilgili herhangi bir sorunuz olduğunda, bizimle şu yollarla iletişime geçebilirsiniz: <br /> <br />

                                        E-posta: gizlilik@turnike.com <br />
                                        Telefon: +90 (506) 064-6981 <br />
                                    </p>
                                    <br />
                                    <p>Turnike, çerezlerin kullanımını ve kişisel verilerinizin güvenliğini ciddiyetle ele alır. Web sitemizi kullanarak çerezlerin kullanımını kabul etmiş olursunuz.</p>
                                </DialogContent>
                            </Dialog>
                        </ul>
                    </div>
                    <hr />
                    <div className="events-div">
                        <ul>
                            <h3>KATEGORİLER</h3>
                            {
                                categories && categories.map((category: CategoryType, index: number) => (
                                    <li className="category-list" onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => handleCategory(e, category.name)} key={index}>{category.name == "cinema" && "Sinema"}
                                        {category.name == "concert" && "Konser"}
                                        {category.name == "theatre" && "Tiyatro"}
                                        {category.name == "standup" && "Stand Up"}</li>
                                ))
                            }
                        </ul>

                    </div>
                    <hr />
                    <div className="communication-div">
                        <ul>
                            <h3>İLETİŞİM</h3>
                            <li><EmailIcon sx={{ marginRight: "10px" }} /><p>gurkan.karadas@outlook.com.tr</p></li>
                            <li><LocalPhoneIcon sx={{ marginRight: "10px" }} /><p>+905060646981</p></li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="footer-bottom">
                    <span>© 2024 Turnike Bilet Dağıtım Basım ve Tic. A.Ş. Tüm hakları saklıdır.</span>
                    <span>Bu web sitesinin kullanımı, ticari kullanımı engelleyen Kullanım Koşulları'na tabidir. Bu sayfayı geçtiğinizde bu koşulları kabul etmiş sayılırsınız.</span>
                </div>

            </Container>

        </div>
    )
}

export default Footer
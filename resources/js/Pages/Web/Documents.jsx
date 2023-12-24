import Section from '@/Components/Section';
import DocumentItem from '@/Components/DocumentItem/DocumentItem';

export default function Documents() {
  const docs = [
    {
      id: 1,
      title: 'Свидетелство за регистрация на ППС част I-ва и част II-ра(голям и малък талон на автомобила)',
      icon: 'contract',
      iconClasses: 'material-symbols-outlined'
    },
    {
      id: 2,
      title: 'Валидна застраховка ”Гражданска отговорност” за съответната година.',
      icon: 'diagnosis',
      iconClasses: 'material-symbols-outlined'
    },
    {
      id: 3,
      title: 'Документ за самоличност на лицето представящо ППС-то на преглед(не е задължително това да е собственика на МПС-то).',
      icon: 'contact_page',
      iconClasses: 'material-icons'
    },
    {
      id: 4,
      title: 'Документ за платен данък на превозното средство за съответната година.',
      icon: 'receipt_long',
      iconClasses: 'material-icons'
    },
    {
      id: 5,
      title: 'Документ за техническата изправност на монтирана в МПС автомобилна газова уредба(АГУ)(паспорт)',
      icon: 'quick_reference',
      iconClasses: 'material-symbols-outlined'
    },
    {
      id: 6,
      title: 'Знак за извършен преглед от предходната година, ако има такъв',
      icon: 'flowsheet',
      iconClasses: 'material-symbols-outlined'
    },
  ]

  return (
    <>
      <Section id='documents' className='bg-white py-16 lg:py-32'>
        <div className="lg:container">
          <h1 className="text-primary text-center font-montserrat mb-10 text-3xl lg:py-14 lg:text-4xl">Необходими документи</h1>
          <div className='ml-10'>

            {docs.map(item => (
              <DocumentItem
                key={item.id}
                title={item.title}
                icon={item.icon}
                iconClasses={item.iconClasses}
              />

            ))}
          </div>
        </div>
      </Section>
      <style>{`
          
      `}</style>
    </>
  );
}
import dom from "./domElements.js"; // default export

export const getAndRenderHadeeth = async ()=> {
    const randomIndex = Math.floor(Math.random() * 75)
    const hadeeth = hadeeths_list[randomIndex]
    renderHadeeth(hadeeth)
}

const renderHadeeth = ({attribution, grade, hadeeth}) => {
    dom().hadeethQuote.textContent = ''
    dom().hadeethGrade.textContent = ''
    dom().hadeethAttribution.textContent = ''
    dom().hadeethQuote.insertAdjacentText("afterbegin", hadeeth)
    dom().hadeethGrade.insertAdjacentText("afterbegin", "Grade: " + grade)
    dom().hadeethAttribution.insertAdjacentText("afterbegin", "Attribution: " + attribution)
}

const hadeeths_list = [
    {
        id: "2751",
        attribution: "[Al-Bukhari]",
        grade: "Sahih/Authentic.",
        hadeeth: "Anas ibn Mālik (A.p.w.h) reported: The Messenger of Allah (p.b.u.h) performed Hajj on the back of a camel, and the same mount was carrying his baggage as well."
    },
    {
        id: "2753",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn ‘Abbās (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"‘Umrah in Ramadan is equivalent to Hajj – or Hajj with me.\""
    },
    {
        id: "2750",
        attribution: "[Al-Bukhari]",
        grade: "Sahih/Authentic.",
        hadeeth: "As-Sā’ib ibn Yazīd (A.p.w.h) reported: I was taken to perform pilgrimage with the Messenger of Allah (p.b.u.h) in the Farewell Pilgrimage, when I was seven years old."
    },
    {
        id: "2758",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Hurayrah (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"Whoever performs Hajj and does not commit obscenity or commit any evil therein will go back (free of sin) as on the day his mother gave birth to him.\""
    },
    {
        id: "2754",
        attribution: "[Al-Bukhari]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Hurayrah (A.p.w.h) reported: The Prophet (p.b.u.h) used to observe I‘tikāf during each Ramadan for ten days. The year in which he died, he observed I‘tikāf for twenty days."
    },
    {
        id: "2759",
        attribution: "[Al-Bukhari]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Āishah (A.p.w.h) reported: I said: \"O Messenger of Allah, we consider Jihad as the best deed. Should we not perform Jihad?\" He said: \"The best Jihad for you (women) is an accepted Hajj.\""
    },
    {
        id: "2935",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Ibn ‘Abbās (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"When anyone of you eats food, let him not wipe his hand until he licks it or has it licked.\""
    },
    {
        id: "2946",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Anas ibn Mālik (A.p.w.h) reported: A man who had drunk alcohol was brought to the Prophet (p.b.u.h), who hit him with a palm stalk with about forty lashes."
    },
    {
        id: "2947",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn ‘Umar (A.p.w.h) reported: The Prophet (p.b.u.h) cut off (a thief's hand) for a shield that was worth three dirhams."
    },
    {
        id: "2949",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn ‘Umar (A.p.w.h) reported that a woman was found killed in one of the expeditions of the Prophet (p.b.u.h), and so he denounced killing women and children."
    },
    {
        id: "2952",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Ā’ishah (A.p.w.h) reported that the Messenger of Allah (p.b.u.h) was asked about mead, and he said: \"Every drink that intoxicates is unlawful.\""
    },
    {
        id: "2962",
        attribution: "[Al-Bukhari and Muslim. This is the wording of Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn Mas‘ūd (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"The first cases to be settled among people on the Day of Judgment will be the cases of blood (homicide).\""
    },
    {
        id: "2964",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Ā’ishah (A.p.w.h) reported that the Prophet (p.b.u.h) said: ''The hand of a thief is to be cut off for a quarter of a dinar or more.\""
    },
    {
        id: "2960",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Ibn ‘Umar (A.p.w.h) reported that the Prophet (p.b.u.h) forbade vowing and said: \"Indeed, a vow does not bring any good; rather it is only a means to extract something from the miser.”"
    },
    {
        id: "2987",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Burdah Hāni’ ibn Niyār (A.p.w.h) reported: I heard the Messenger of Allah (p.b.u.h) say: \"No more than ten lashes are to be given except regarding one of the limits set by Allah.\""
    },
    {
        id: "2986",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Umar ibn al-Khattāb (A.p.w.h) reported that the Messenger of Allah (p.b.u.h) said: \"Do not wear silk, for whoever wears it in this world will not wear it in the Hereafter.\""
    },
    {
        id: "2978",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn ‘Umar (A.p.w.h) reported: The Messenger of Allah (p.b.u.h) divided the spoils, allotting two shares to the horse and one share to the man."
    },
    {
        id: "2997",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Mūsa al-Ash‘ari (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"Whoever carries weapons against us is not one of us.\""
    },
    {
        id: "3018",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Ā’ishah (A.p.w.h) reported: The Messenger of Allah (p.b.u.h) preferred beginning with the right side when wearing his sandals, combing his hair, purifying himself, and in all his affairs."
    },
    {
        id: "3001",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "My sister took a vow to walk to the Sacred Mosque barefoot. Then, she asked me to ask the Messenger of Allah (p.b.u.h) about it. I asked him, and he replied: \"Let her walk and ride.\""
    },
    {
        id: "2999",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn Abi Awfa (A.p.w.h) reported: We participated with the Messenger of Allah (p.b.u.h) in seven battles wherein we ate locusts."
    },
    {
        id: "3015",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn ‘Umar (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"Bilāl calls the Adhān at night; so, eat and drink until you hear the Adhān called by Ibn Umm Maktūm.\""
    },
    {
        id: "2990",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Al-Barā’ ibn ‘Āzib (A.p.w.h) reported: I have never seen anyone with shoulder-length hair and wearing a red garment more beautiful than the Messenger of Allah (p.b.u.h). He had shoulder-length hair and broad shoulders and was neither short nor tall."
    },
    {
        id: "3013",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Sa‘īd al-Khudri (A.p.w.h) reported that the Prophet (p.b.u.h) said: “When you hear the Muezzin, repeat what he says.”"
    },
    {
        id: "3000",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Asmā’ bint Abu Bakr (A.p.w.h) reported: We slaughtered a horse and ate it at the time of the Messenger of Allah (p.b.u.h. Another narration has the following addition: \"while we were in Madīnah.\""
    },
    {
        id: "3017",
        attribution: "[At-Tirmidhi]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Karīmah al-Miqdād ibn Ma‘dikarib (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"When a man loves his brother, he should tell him that he loves him.\""
    },
    {
        id: "3066",
        attribution: "[Al-Bukhari and Muslim with all its versions]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Ā'ishah, ‘Abdullāh ibn 'Umar, and Anas ibn Mālik (may Allah be pleased with them) reported that the Prophet (p.b.u.h) said: \"If the Iqāmah for prayer is proclaimed, and the dinner is served, start with the dinner.\""
    },
    {
        id: "3071",
        attribution: "[Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Hurayrah (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"Let not a believing man hate a believing woman. If he dislikes one of her characteristics, he will be pleased with another.\""
    },
    {
        id: "3083",
        attribution: "[At-Tirmidhi]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn ‘Amr ibn al-‘ās (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"He does not belong to us who does not show mercy to our young and honor our old.\""
    },
    {
        id: "3075",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Hudhayfah ibn al-Yamān (A.p.w.h) reported: \"I was with the Prophet (p.b.u.h) and then he urinated, performed ablution, and wiped over his leather socks."
    },
    {
        id: "3111",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Anas ibn Mālik (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"Be moderate in prostration, and let none of you spread his forearms on the ground like a dog.\""
    },
    {
        id: "3107",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Hurayrah (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"If you said to your companion: 'Be quiet and listen' on Friday while the Imām is delivering the sermon, then you would be guilty of idle talk.\""
    },
    {
        id: "3086",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Hurayrah (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"Isn't he who raises his head before the Imām afraid that Allah may transform his head into that of a donkey or his shape into that of a donkey?\""
    },
    {
        id: "3110",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Hurayrah (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"Shall I tell you something about Antichrist that no Prophet has ever told his people? Verily, he is one-eyed and will bring with him something like Paradise and Hell.\""
    },
    {
        id: "3112",
        attribution: "[Al-Bukhari]",
        grade: "Sahih/Authentic.",
        hadeeth: "Maslamah Sa‘īd ibn Yazīd reported: I asked Anas ibn Mālik: \"Did the Prophet (p.b.u.h) use to pray with his shoes on?\" He said: ‘Yes!'"
    },
    {
        id: "3088",
        attribution: "[Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Ā'ishah (A.p.w.h) reported that the Prophet (p.b.u.h, said: \"Prayer should not be offered when food is ready, nor when one is in dire need of answering the call of nature.\""
    },
    {
        id: "3122",
        attribution: "[At-Tirmidhi]",
        grade: "Hasan/Sound.",
        hadeeth: "Abu Hurayrah (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"A man follows the religion (i.e. ways and manners) of his intimate friend. So, each of you should carefully consider whom he takes as his intimate friend.\""
    },
    {
        id: "3121",
        attribution: "[Al-Bukhari]",
        grade: "Sahih/Authentic.",
        hadeeth: "Mirdās al-Aslami (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"Righteous people will go (die) one after another. Meanwhile, the dregs of people, like waste barley or dates, will remain. Allah will not raise them in esteem.\""
    },
    {
        id: "3124",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Ā’ishah (A.p.w.h) reported: The Messenger of Allah (p.b.u.h) once sent sheep as Hady."
    },
    {
        id: "3108",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn ‘Umar (A.p.w.h) reported: Al-‘Abbās ibn ‘Abdul-Muttalib sought permission from the Messenger of Allah (p.b.u.h) to spend the nights of Mina in Makkah to provide (the pilgrims with) water, and he permitted him."
    },
    {
        id: "3117",
        attribution: "[Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Sa‘īd al-Khudri (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"From among your caliphs there will be a caliph, at the end of times, who will distribute money without counting it.\""
    },
    {
        id: "3150",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Anas ibn Mālik (A.p.w.h) reported: The Prophet (p.b.u.h) used to say before entering the bathroom: O Allah, I seek refuge in You from the male and female devils"
    },
    {
        id: "3153",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Sa‘īd al-Khudri (A.p.w.h) reported: The Messenger of Allah (p.b.u.h) was more bashful than a virgin in her boudoir. Whenever he saw anything he disliked, we could perceive it on his face."
    },
    {
        id: "3157",
        attribution: "[Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Sahl ibn Hunayf (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"Whoever sincerely asks Allah, the Almighty, for martyrdom, Allah will raise him to the status of martyrs even if he dies on his bed.\""
    },
    {
        id: "3144",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Hurayra (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"Five are the acts of Fitrah: circumcision, shaving the pubic hair, cutting the mustache, clipping the nails, and plucking the armpit hair.\""
    },
    {
        id: "3167",
        attribution: "[At-Tirmidhi]",
        grade: "Sahih/Authentic.",
        hadeeth: "Anas (A.p.w.h) reported that the Messenger of Allah (p.b.u.h) said: \"Recite frequently: Yādha al-jalāl wa al-ikrām (O Possessor of Majesty and Bounty).”"
    },
    {
        id: "3041",
        attribution: "[Al-Bukhari]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Bakr (A.p.w.h) said: \"Show reverence to Muhammad (p.b.u.h) by honoring his family members.\""
    },
    {
        id: "3030",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Anas ibn Mālik (A.p.w.h) reported: When the Messenger of Allah (p.b.u.h) entered the privy, a servant and I used to carry a waterskin and a pointed staff, and he would cleanse himself with water."
    },
    {
        id: "3344",
        attribution: "[Al-Bukhari]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Ali ibn Abi Tālib (A.p.w.h) said: \"Speak to the people according to their level of understanding. Do you wish that Allah and His Messenger be denied?\""
    },
    {
        id: "3025",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn ‘Abbās (A.p.w.h) reported: The Prophet (p.b.u.h) circumambulated the Kab‘ah in the Farewell Hajj on the back of a camel, touching the Corner with a crook."
    },
    {
        id: "3031",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Anas ibn Mālik (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"Straighten your rows, for indeed, straightening the rows is part of the perfection of the prayer.\""
    },
    {
        id: "3026",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn ‘Umar (A.p.w.h) reported: I did not see the Prophet (p.b.u.h) wiping with his hand anything of the House except the two Yemeni Corners."
    },
    {
        id: "3023",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn ‘Umar (A.p.w.h) reported: One day I climbed over Hafsah's house, and I saw the Prophet (p.b.u.h) relieving himself while facing the Levant, with his back toward the Ka‘bah.\nIn another version, he said: \"while facing Bait al-Maqdis.\""
    },
    {
        id: "3021",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn ‘Umar (A.p.w.h) reported: ‘Umar ibn al-Khattāb (A.p.w.h) said: \"O Messenger of Allah, may anyone of us sleep while being ritually impure?\" He said: \"Yes, he may sleep if he makes ablution.\""
    },
    {
        id: "3022",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn ‘Umar (A.p.w.h) reported that the Messenger of Allah (p.b.u.h) entered Makkah from Kadā', from the upper mountain pass which is in Al-Bat-hā', and exited from the lower mountain pass."
    },
    {
        id: "3044",
        attribution: "[Al-Bukhari]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘‘Abdullāh ibn ‘Amr ibn al-‘Aas (A.p.w.h) reported that the Messenger of Allah (p.b.u.h) said: \"The grave major sins are: associating partners with Allah, undutifulness towards the parents, murder, and intentional false oath.\""
    },
    {
        id: "3040",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘‘Abdullāh ibn ‘Umar (A.p.w.h) reported: The Messenger of Allah (p.b.u.h) used to go by way of Ash-Shajarah and return by way of Al-Mu‘arras. He would also enter Makkah through the Higher Pass and leave through the Lower Pass."
    },
    {
        id: "3045",
        attribution: "[Ibn Maajah]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Sa‘īd al-Khudri (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"The best Jihad is to speak a word of justice to an oppressive ruler.\""
    },
    {
        id: "3253",
        attribution: "[At-Tirmidhi]",
        grade: "Sahih/Authentic by virtue of corroborating evidence.",
        hadeeth: "Jābir ibn Samurah (A.p.w.h) reported: When we went to the Prophet (p.b.u.h) one would sit wherever there was room."
    },
    {
        id: "3229",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn ‘Abbās (A.p.w.h) reported: People were commanded to make (Tawāf around) the Ka‘bah the last thing they do, but an exception was made for the menstruating woman."
    },
    {
        id: "3230",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn ‘Abbās (A.p.w.h) reported that the Messenger of Allah (p.b.u.h) said: \"I was commanded to prostrate on seven bones: the forehead - and he pointed to his nose - the hands, the knees, and the toes.\""
    },
    {
        id: "3228",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Umm ‘Atiyyah al-Ansāriah (A.p.w.h) reported: We were forbidden to follow funeral processions, but the prohibition was not mandatory for us."
    },
    {
        id: "3220",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn Mālik ibn Buhaynah (A.p.w.h) reported: When the Prophet (p.b.u.h) prayed, he used to keep his upper arms away from his sides, such that the whiteness of his armpits would be visible."
    },
    {
        id: "3270",
        attribution: "[Abu Dawood]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Sa‘īd al-Khudri (A.p.w.h) reported: I heard the Messenger of Allah (p.b.u.h) say: \"The best sitting places are the widest.\""
    },
    {
        id: "3279",
        attribution: "[Al-Bukhari and Muslim. This is the wording of Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Ibn ‘Umar (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"Trim the mustaches and grow the beards.\""
    },
    {
        id: "3317",
        attribution: "[At-Tirmidhi]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Hurayrah (A.p.w.h) reported: Whenever the Messenger of Allah (p.b.u.h) sneezed, he would cover his mouth with his hand or cloth, suppressing or lowering (the narrator was unsure), the sound therewith."
    },
    {
        id: "3307",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Anas ibn Mālik (A.p.w.h) reported that the Prophet (p.b.u.h) ordered Bilāl to pronounce the Adhān in pairs and the Iqāmah in singles."
    },
    {
        id: "3314",
        attribution: "[Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Hurayrah (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"Some people will enter Paradise whose hearts are like the hearts of birds.\""
    },
    {
        id: "3057",
        attribution: "[Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Abdullāh ibn Mas‘ūd (A.p.w.h) reported: The Messenger of Allah (p.b.u.h) used to say: \"O Allah, I ask You for guidance, piety, chastity, and richness!\""
    },
    {
        id: "3321",
        attribution: "[At-Tirmidhi]",
        grade: "Hasan/Sound.",
        hadeeth: "‘Ā'ishah (A.p.w.h) reported: The speech of the Messenger of Allah (p.b.u.h) was clearly articulated that anyone who listened to him could understand it."
    },
    {
        id: "3060",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Ā’ishah (A.p.w.h) reported: I have never seen the Messenger of Allah (p.b.u.h) laugh so heartily that his uvula could be seen; rather, he would only smile."
    },
    {
        id: "3054",
        attribution: "[Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Abu Tarīf ‘Adiyy ibn Hātim (A.p.w.h) reported that the Prophet (p.b.u.h) said: \"Whoever takes an oath to do something and then he finds a better alternative which brings him closer to Allah should do what is better in piety.\""
    },
    {
        id: "3063",
        attribution: "[Al-Bukhari and Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "Hudhayfah ibn al-Yamān (A.p.w.h) reported that when the Messenger of Allah (p.b.u.h) used to get up at night, he would cleanse his mouth with the tooth-stick."
    },
    {
        id: "3055",
        attribution: "[Muslim]",
        grade: "Sahih/Authentic.",
        hadeeth: "‘Imrān ibn Husayn (A.p.w.h) reported that the Messenger (p.b.u.h) said: \"Modesty brings nothing but good.\" In another narration: \"All of modesty is good.\""
    },
    {
        id: "3300",
        attribution: "[Al-Bukhari]",
        grade: "Sahih/Authentic.",
        hadeeth: "Anas ibn Mālik (A.p.w.h) said: “You indulge in such actions that are less significant in your eyes than a hair, while we used to consider them destructive sins during the Prophet’s lifetime.”"
    }
]
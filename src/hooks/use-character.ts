import { create } from "zustand";

type Character = {
	name: string;
	avatar: string;
	info: string;
	text: string;
	relateCharacter: {
		name: string;
		avatar: string;
		relationship: string;
		desc: string;
	}[];
};

interface useCharacterStore {
	characterList: Character[];
	currentCharacter: number;
	setCurrentCharacter: (index: number) => void;
}

export const useCharacter = create<useCharacterStore>((set) => ({
	characterList: [
		{
			name: "李白",
			avatar: "/UI_head1.png",
			info: "李白，中国唐代伟大的诗人，字太白，号青莲居士，被誉为“诗仙”。自信是李白性格中的一大特点，他在诗歌中表达了自己对于才华的自信和对于未来的期许。他常常以自诩的语气描述自己的才华和成就，表现出一种无所畏惧的自信。\n当时李白还过的十分阔达浪漫，爱好游览，在四处以诗酒会友，期望通过结识更多的达官贵人使自己能谋求一官半职。",
			text: "豪放是李白的另一大特点，他在生活中不受拘束，喜欢自由自在地游历名山大川，与朋友交往也不受世俗礼节的限制。他的诗歌中充满了豪迈奔放的气息，展现出一种不拘一格的精神风貌。洒脱是李白性格中的另一个特点，他在生活中不拘小节，不刻意追求完美。他能够随遇而安，不计较得失成败，表现出一种超然物外的洒脱和豁达。傲岸不羁是李白的最后一个特点，他在生活中自视甚高，不屑于与世俗同流合污。他坚守自己的信念和追求，不受外界的干扰和诱惑，表现出一种傲岸不羁的精神风范。",
			relateCharacter: [
				{
					name: "孟浩然",
					avatar: "/UI_head2.png",
					relationship: "好友",
					desc: "孟浩然（689年—740年），字浩然，号孟山人，襄州襄阳（今湖北襄阳）人，唐代著名的山水田园派诗人，世称“孟襄阳”。因他未曾入仕，又称之为“孟山人”。孟浩然生于盛唐，早年有志用世，在仕途困顿、痛苦失望后，尚能自重，不媚俗世，修道归隐终身。曾隐居鹿门山。40岁时，游长安，应进士举不第。曾在太学赋诗，名动公卿，一座倾服，为之搁笔。开元二十五年（737）张九龄招致幕府，后隐居。孟诗绝大部分为五言短篇，多写山水田园和隐居的逸兴以及羁旅行役的心情。其中虽不无愤世嫉俗之词，而更多属于诗人的自我表现。",
				},
				{
					name: "刘长卿",
					avatar: "/UI_head3.png",
					relationship: "好友",
					desc: "123",
				},
				{
					name: "酒肆老板",
					avatar: "/UI_head3.png",
					relationship: "熟客",
					desc: "123",
				},
				{
					name: "笔行老板",
					avatar: "/UI_head3.png",
					relationship: "熟客",
					desc: "123",
				},
				{
					name: "小二",
					avatar: "/UI_head3.png",
					relationship: "熟人",
					desc: "123",
				},
				{
					name: "书塾先生",
					avatar: "/UI_head3.png",
					relationship: "熟人",
					desc: "123",
				},
			],
		},
		{
			name: "刘长卿",
			avatar: "/UI_head2.png",
			info: "刘长卿（约726年-789或790年），字文房，世称刘随州，宣城（今属安徽）人，一说河间（今属河北）人 [9]，中国唐代诗人。",
			text: "刘长卿作品有集，称《刘随州集》，《唐诗汇评》称10卷，《唐诗大辞典修订本》称11卷。有《四部丛刊》本、《四部备要》本通行于世。今人注本有储仲君《刘长卿诗编年笺注》、杨世明《刘长卿诗编年校注》。",
			relateCharacter: [
				{
					name: "孟浩然",
					avatar: "/UI_head2.png",
					relationship: "好友",
					desc: "123",
				},
				{
					name: "孟浩然",
					avatar: "/UI_head2.png",
					relationship: "好友",
					desc: "123",
				},
				{
					name: "孟浩然",
					avatar: "/UI_head2.png",
					relationship: "好友",
					desc: "123",
				},
				{
					name: "孟浩然",
					avatar: "/UI_head2.png",
					relationship: "好友",
					desc: "123",
				},
				{
					name: "孟浩然",
					avatar: "/UI_head2.png",
					relationship: "好友",
					desc: "123",
				},
				{
					name: "孟浩然",
					avatar: "/UI_head2.png",
					relationship: "好友",
					desc: "123",
				},
				{
					name: "孟浩然",
					avatar: "/UI_head2.png",
					relationship: "好友",
					desc: "123",
				},
				{
					name: "孟浩然",
					avatar: "/UI_head2.png",
					relationship: "好友",
					desc: "123",
				},
			],
		},
		{
			name: "孟浩然",
			avatar: "/UI_head3.png",
			info: "孟浩然（689年—740年），字浩然，号孟山人，襄州襄阳（今湖北襄阳）人，唐代著名的山水田园派诗人，世称“孟襄阳”。因他未曾入仕，又称之为“孟山人”。孟浩然生于盛唐，早年有志用世，在仕途困顿、痛苦失望后，尚能自重，不媚俗世，修道归隐终身。曾隐居鹿门山。40岁时，游长安，应进士举不第。曾在太学赋诗，名动公卿，一座倾服，为之搁笔。开元二十五年（737）张九龄招致幕府，后隐居。孟诗绝大部分为五言短篇，多写山水田园和隐居的逸兴以及羁旅行役的心情。其中虽不无愤世嫉俗之词，而更多属于诗人的自我表现。",
			text: "孟浩然的诗在艺术上有独特的造诣，后人把孟浩然与盛唐另一山水诗人王维并称为“王孟”，有《孟浩然集》三卷传世。",
			relateCharacter: [
				{
					name: "李白",
					avatar: "/UI_head1.png",
					relationship: "好友",
					desc: "123",
				},
				{
					name: "崔颢",
					avatar: "/UI_head2.png",
					relationship: "好友",
					desc: "123",
				},
				{
					name: "书塾先生",
					avatar: "/UI_head2.png",
					relationship: "好友",
					desc: "123",
				},
				{
					name: "王维",
					avatar: "/UI_head2.png",
					relationship: "知己",
					desc: "123",
				},
			],
		},
	],
	currentCharacter: 0,
	setCurrentCharacter: (index) => set(() => ({ currentCharacter: index })),
}));

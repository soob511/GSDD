import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class news {
	public static void main(String[] args) throws IOException {
		filewrite fw = new filewrite();
		StringBuilder sb;
		File file = filewrite.createFile("./news.txt");
		for (int k = 0; k < 31; k++) {
			System.out.println(k);
			String url = "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid2=249&sid1=102&date="
					+ LocalDateTime.now().minusDays(k).format(DateTimeFormatter.ofPattern("yyyyMMdd")) + "&page=";
			int page = getPageNum(url, 1);
			System.out.println(page);
			for (int i = 1; i <= page; i++) {
				Document doc = Jsoup.connect(url + i).timeout(5000).get();
				Elements elements = doc.getElementsByAttributeValue("class", "list_body newsflash_body");
				Element element = elements.get(0);

				Elements photoElements = element.getElementsByAttributeValue("class", "photo");

				for (int j = 0; j < photoElements.size(); j++) {
					Element articleElement = photoElements.get(j);
					Elements aElements = articleElement.select("a");
					Element aElement = aElements.get(0);
					String articleUrl = aElement.attr("href");
					Element imgElement = aElement.select("img").get(0);
					String title = imgElement.attr("alt");
					try {
						Document subDoc = Jsoup.connect(articleUrl).get();
						Element contentElement = subDoc.getElementById("dic_area");
						String content = contentElement.text();
						filewrite.writer(file, "title ");
						filewrite.writer(file, title);
						filewrite.writer(file, "\n");
						filewrite.writer(file, "URL ");
						filewrite.writer(file, articleUrl);
						filewrite.writer(file, "\n");
						filewrite.writer(file, content);
						filewrite.writer(file, "\n");
					} catch (Exception e) {
					}
				}
			}

		}
	}

	public static int getPageNum(String url, int page) throws IOException {
		Elements el = Jsoup.connect(url + page).get().select("div.paging a");
		int pages = el.size();

		if (el.get(pages - 1).text().equals("다음"))
			return getPageNum(url, page + 10);
		else
			return page + pages - 1;
	}

}
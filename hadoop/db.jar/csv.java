import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class csv {
	private static Connection conn;
	private static final String USERNAME = "gsdd";
	private static final String PASSWORD = "gsdd2725";
	private static final String URL = "jdbc:mysql://j7b209.p.ssafy.io:3306/gsdd?serverTimezone=Asia/Seoul&useSSL=false";
	private static csv csvReader = new csv();

	public static void main(String[] args) throws SQLException {
		conn.prepareStatement("truncate news").executeUpdate();
		csvReader.readCSV();
	}

	public csv() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
			System.out.println("연결성공");
		} catch (Exception e) {
			System.out.println("연결실패");
			try {
				conn.close();
			} catch (Exception e1) {

			}
		}
	}

	public void insertBoard(String table, String s1, String s2, String s3, String s4) {
		String sql = "insert into " + table + " values(?,?,?,?,?)";
		System.out.println(s1);
		System.out.println(s2);
		System.out.println(s3);
		System.out.println(s4);
		PreparedStatement pstmt = null;
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, null);
			pstmt.setString(2, s1);
			pstmt.setString(3, s2);
			pstmt.setString(4, s3);
			pstmt.setString(5, s4);

			int result = pstmt.executeUpdate();
			if (result == 1) {
				System.out.println(table + " 입력");

			}

		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(table + " 입력실패");
		} finally {
			try {
				if (pstmt != null && !pstmt.isClosed()) {
					pstmt.close();
				}
			} catch (Exception e2) {
			}
		}

	}

	public List<List<String>> readCSV() {
		List<List<String>> csvList = new ArrayList<List<String>>();
		File csv = new File("/home/ubuntu/news/DBarticle.txt");
		BufferedReader br = null;
		String line = "";

		try {
			br = new BufferedReader(new FileReader(csv));
			while ((line = br.readLine()) != null) {
				String[] arr = line.split("@");
				String title = "";
				String url = "";
				String area = "";
				String keyword = "";
				for (int i = 0; i < arr.length; i++) {
					if (arr[i].split(" ")[0].equals("title")) {
						title = arr[i].substring(5).trim();
					} else if (arr[i].split(" ")[0].equals("URL")) {
						url = arr[i].substring(4).trim();
					} else if (arr[i].split(" ")[0].equals("지역")) {
						area = arr[i].substring(3).trim();
					} else if (arr[i].split(" ")[0].equals("키워드")) {
						keyword = arr[i].substring(4).trim();
					}
				}
				csvReader.insertBoard("news", title, url, keyword, area);
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			try {
				if (br != null) {
					br.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return csvList;
	}
}
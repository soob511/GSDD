import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;

public class filewrite {
	public static File createFile(String fileName) {
		File file = new File(fileName);
		try {
			// 두번째 인자가 true인 경우 파일이 있을때 기존 파일에 내용을 이어 붙인다.
			// false인 경우 덮어쓰기
			FileOutputStream fileOutputStream = new FileOutputStream(file, false);

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		return file;
	}
	public static void writer(File file,String s) {
		try {
			FileWriter fw = new FileWriter(file ,true);
			BufferedWriter writer = new BufferedWriter(fw);
			
			writer.write(s);
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	

}
